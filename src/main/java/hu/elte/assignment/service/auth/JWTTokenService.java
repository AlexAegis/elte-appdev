package hu.elte.assignment.service.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.common.collect.ImmutableMap;
import hu.elte.assignment.service.DateService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.compression.GzipCompressionCodec;
import lombok.experimental.FieldDefaults;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.function.Supplier;

import static io.jsonwebtoken.SignatureAlgorithm.HS256;
import static io.jsonwebtoken.impl.TextCodec.BASE64;
import static java.util.Objects.requireNonNull;
import static lombok.AccessLevel.PRIVATE;
import static org.apache.commons.lang3.StringUtils.substringBeforeLast;

@Service
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class JWTTokenService implements TokenService, Clock {
	private static final String DOT = ".";

	DateService dates;
	String issuer;
	int expirationSec;
	int clockSkewSec;
	String secretKey;

	JWTTokenService(final DateService dates, @Value("${jwt.issuer:elte}") final String issuer,
	                @Value("${jwt.expiration-sec:600}") final int expirationSec,
	                @Value("${jwt.clock-skew-sec:300}") final int clockSkewSec, @Value("${jwt.secret:secret}") final String secret) {
		super();
		this.dates = requireNonNull(dates);
		this.issuer = requireNonNull(issuer);
		this.expirationSec = expirationSec;
		this.clockSkewSec = clockSkewSec;
		this.secretKey = BASE64.encode(requireNonNull(secret));
	}

	@Override
	public String permanent(final Map<String, String> attributes) {
		return newToken(attributes, 0);
	}

	@Override
	public String expiring(final Map<String, String> attributes) {
		return newToken(attributes, expirationSec);
	}

	/**
	 * Already refactored to the auth0 solution
	 * @param attributes
	 * @param expiresInSec
	 * @return
	 */
	private String newToken(final Map<String, String> attributes, final int expiresInSec) {
		final DateTime now = dates.now();
		final Claims claims = Jwts.claims().setIssuer(issuer).setIssuedAt(now.toDate());

		if (expiresInSec > 0) {
			final DateTime expiresAt = now.plusSeconds(expiresInSec);
			claims.setExpiration(expiresAt.toDate());
		}
		claims.putAll(attributes);

		return Jwts.builder().setClaims(claims).signWith(HS256, secretKey).compact();

	}

	@Override
	public Map<String, String> verify(final String token) {

		final JwtParser parser = Jwts.parser().requireIssuer(issuer).setClock(this).setAllowedClockSkewSeconds(clockSkewSec)
				.setSigningKey(secretKey);
		return parseClaims(() -> parser.parseClaimsJws(token).getBody());
	}

	@Override
	public Map<String, String> untrusted(final String token) {
		//JWT.require(Algorithm.HMAC256(secretKey)).withIssuer(issuer)
		final JwtParser parser = Jwts.parser().requireIssuer(issuer).setClock(this)
				.setAllowedClockSkewSeconds(clockSkewSec);

		// See: https://github.com/jwtk/jjwt/issues/135
		final String withoutSignature = substringBeforeLast(token, DOT) + DOT;
		return parseClaims(() -> parser.parseClaimsJwt(withoutSignature).getBody());
	}

	private static Map<String, String> parseClaims(final Supplier<Claims> toClaims) {
		try {
			final Claims claims = toClaims.get();
			final ImmutableMap.Builder<String, String> builder = ImmutableMap.builder();
			for (final Map.Entry<String, Object> e : claims.entrySet()) {
				builder.put(e.getKey(), String.valueOf(e.getValue()));
			}
			return builder.build();
		} catch (final IllegalArgumentException | JwtException e) {
			return ImmutableMap.of();
		}
	}

	@Override
	public Date now() {
		final DateTime now = dates.now();
		return now.toDate();
	}
}