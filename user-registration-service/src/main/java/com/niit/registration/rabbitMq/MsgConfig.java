package com.niit.registration.rabbitMq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MsgConfig {
	String exchangeName="finalExchange";
	String queueName="RegisterQueue";
	@Bean
	public DirectExchange directExchange()
	{
		return new DirectExchange(exchangeName);

	}
	@Bean
	public Queue queue(){
		return new Queue(queueName);
	}
	@Bean
	public Binding userBinding(Queue queue, DirectExchange directExchange){
		return BindingBuilder.bind(queue).to(directExchange).with("routingKey");
	}
	@Bean
	public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory){
		RabbitTemplate rabbitTemplate=new RabbitTemplate(connectionFactory);
		rabbitTemplate.setMessageConverter(producerConvertor());
		return rabbitTemplate;
	}
	@Bean
	public Jackson2JsonMessageConverter producerConvertor(){
		return new Jackson2JsonMessageConverter();
	}
}
