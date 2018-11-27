package hu.elte.assignment.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DelayerInterceptor implements HandlerInterceptor {

    private final Logger logger = LoggerFactory.getLogger(DelayerInterceptor.class);

    @Value("${interceptor.delay}")
    private Integer delay;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(delay > 0) {
            logger.warn("The delayer interceptor is turned on!");
            Thread.sleep(delay);
        }
        return true;
    }
}