package com.stackroute.userauthenticationservice.rabbitMq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MsgConfig {


	@Bean
	public DirectExchange directExchange(){
		return new DirectExchange("finalExchange");
	}

	@Bean
	public Queue authQueue(){
		return new Queue("RegisterQueue");
	}


	@Bean
	public Binding authBinding(DirectExchange directExchange){
		return BindingBuilder
				.bind(authQueue())
				.to(directExchange)
				.with("routing1");
	}
	@Bean
	public Jackson2JsonMessageConverter jsonMessageConverter(){
		return new Jackson2JsonMessageConverter();
	}
}
