package hu.elte.assignment.config;

import hu.elte.assignment.service.DateService;
import hu.elte.assignment.service.JodaDateService;

import org.joda.time.DateTimeZone;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DateServiceConfig {

  @Bean
  DateService dateService() {
    return new JodaDateService(defaultTimeZone());
  }

  @Bean
  DateTimeZone defaultTimeZone() {
    return DateTimeZone.UTC;
  }
}
