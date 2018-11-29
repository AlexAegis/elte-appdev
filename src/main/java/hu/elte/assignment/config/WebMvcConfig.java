package hu.elte.assignment.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.elte.assignment.interceptor.DelayerInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.persistence.EntityManager;
import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final ApplicationContext applicationContext;
    private final EntityManager entityManager;
    private final DelayerInterceptor delayerInterceptor;

    @Autowired
    public WebMvcConfig(@Lazy DelayerInterceptor delayerInterceptor, ApplicationContext applicationContext, EntityManager entityManager) {
        this.delayerInterceptor = delayerInterceptor;
        this.applicationContext = applicationContext;
        this.entityManager = entityManager;
    }

    /**
     * Automatic DTO conversion based on Annotations
     * @param argumentResolvers
     */
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json().applicationContext(this.applicationContext).build();
        argumentResolvers.add(new DTOModelMapper(objectMapper, entityManager));
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(delayerInterceptor);
    }

    @Bean
    public DelayerInterceptor delayerInterceptor() {
        return new DelayerInterceptor();
    }
}