package hu.elte.assignment.config;

import hu.elte.assignment.interceptor.DelayerInterceptor;
import hu.elte.assignment.logic.service.UserServiceBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.AccessTokenConverter;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
    @Value("${security.jwt.client-id}")
    private String clientId;

    @Value("${security.jwt.client-secret}")
    private String clientSecret;

    @Value("${security.jwt.grant-type}")
    private String grantType;

    @Value("${security.jwt.scope-read}")
    private String scopeRead;

    @Value("${security.jwt.scope-write}")
    private String scopeWrite = "write";

    @Value("${security.jwt.resource-ids}")
    private String resourceIds;

	private final DelayerInterceptor delayerInterceptor;

	private final PasswordEncoder bCryptPasswordEncoder;

    private final AuthenticationManager authenticationManager;

    private final UserServiceBean userDetailsService;

    private final DefaultTokenServices defaultTokenServices;

    private final AccessTokenConverter accessTokenConverter;
    
	@Autowired
	public AuthorizationServerConfig(@Lazy DelayerInterceptor delayerInterceptor, @Lazy PasswordEncoder bCryptPasswordEncoder, AuthenticationManager authenticationManager, UserServiceBean userDetailsService, DefaultTokenServices defaultTokenServices, AccessTokenConverter accessTokenConverter) {
		this.delayerInterceptor = delayerInterceptor;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
		this.authenticationManager = authenticationManager;
		this.userDetailsService = userDetailsService;
		this.defaultTokenServices = defaultTokenServices;
		this.accessTokenConverter = accessTokenConverter;
	}

	@Override
	public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
		security.allowFormAuthenticationForClients(); // here
	}

	@Override
    public void configure(ClientDetailsServiceConfigurer configurer) throws Exception {
        configurer
                .inMemory()
                .withClient(clientId)
                .secret(bCryptPasswordEncoder.encode(clientSecret))
		        .authorizedGrantTypes("authorization_code", "password", "client_credentials", "implicit", "refresh_token")
                .scopes(scopeRead, scopeWrite)
		        .accessTokenValiditySeconds(3600) // 1 hour
		        .refreshTokenValiditySeconds(2592000) // 30 days
                .resourceIds(resourceIds);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints.userDetailsService(userDetailsService)
                .tokenServices(defaultTokenServices)
		        .addInterceptor(delayerInterceptor)
                .authenticationManager(authenticationManager)
                .accessTokenConverter(accessTokenConverter);
    }
}