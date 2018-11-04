package hu.elte.assignment.config;

import hu.elte.assignment.data.model.user.User;
import hu.elte.assignment.service.UserServiceBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.*;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import java.util.Map;

/**
 * Created by tharsan on 4/24/18.
 */
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

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserServiceBean userDetailsService;

    @Autowired
    private DefaultTokenServices defaultTokenServices;

    @Autowired
    private AccessTokenConverter accessTokenConverter;

/*
    @Autowired
    private UserAuthenticationConverter userAuthenticationConverter;

    @Autowired
    private DefaultAccessTokenConverter defaultAccessTokenConverter;

    @Autowired
    private DefaultUserAuthenticationConverter defaultUserAuthenticationConverter
*/
    @Override
    public void configure(ClientDetailsServiceConfigurer configurer) throws Exception {

        configurer
                .inMemory()
                .withClient(clientId)
                .secret(new BCryptPasswordEncoder().encode(clientSecret))
                .authorizedGrantTypes(grantType)
                .scopes(scopeRead, scopeWrite)
                .resourceIds(resourceIds);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {

        JwtAccessTokenConverter jwt = new JwtAccessTokenConverter();
        DefaultUserAuthenticationConverter duac = new DefaultUserAuthenticationConverter();
        duac.setUserDetailsService(userDetailsService);
        DefaultAccessTokenConverter datc = new DefaultAccessTokenConverter();
        datc.setUserTokenConverter(duac);
        jwt.setAccessTokenConverter(datc);






/*



        DefaultAccessTokenConverter tokenConverter = new DefaultAccessTokenConverter();





        DefaultUserAuthenticationConverter defaultUserAuthenticationConverter = new DefaultUserAuthenticationConverter() {

            @Override
            public Map<String, ?> convertUserAuthentication(Authentication authentication) {
                System.out.println("EWWWWWLLLOOO");
                return super.convertUserAuthentication(authentication);
            }

            @Override
            public Authentication extractAuthentication(Map<String, ?> map) {
                System.out.println("WHOOHOO");
                Authentication authentication = super.extractAuthentication(map);
                // User is my custom UserDetails class
                User user = new User();
                user.setSpecialKey(map.get("specialKey").toString());
                return new UsernamePasswordAuthenticationToken(user,
                        authentication.getCredentials(), authentication.getAuthorities());
            }

        };
        defaultUserAuthenticationConverter.setUserDetailsService(userDetailsService);
        tokenConverter.setUserTokenConverter(defaultUserAuthenticationConverter);
*/
        endpoints.userDetailsService(userDetailsService)
                .tokenServices(defaultTokenServices)
                .authenticationManager(authenticationManager)
                .accessTokenConverter(jwt);
    }
}