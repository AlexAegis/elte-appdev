package hu.elte.assignment.config;

import hu.elte.assignment.service.UserServiceBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.DefaultUserAuthenticationConverter;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

/**
 * Created by tharsan on 4/24/18.
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
    @Autowired
    private ResourceServerTokenServices tokenServices;

    @Value("${security.jwt.resource-ids}")
    private String resourceIds;


    @Autowired
    private UserServiceBean userDetailsService;

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
/*
        JwtAccessTokenConverter jwt = new JwtAccessTokenConverter();
        DefaultUserAuthenticationConverter duac = new DefaultUserAuthenticationConverter();
        duac.setUserDetailsService(userDetailsService);
        DefaultAccessTokenConverter datc = new DefaultAccessTokenConverter();
        datc.setUserTokenConverter(duac);
        jwt.setAccessTokenConverter(datc);
*/

        resources
                .resourceId(resourceIds)
                .tokenServices(tokenServices);
    }



    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.requestMatchers()
            .and()
            .authorizeRequests()
            .antMatchers("/rest/**" )
                .authenticated();
    }
}