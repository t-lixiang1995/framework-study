package com.pcitc.health;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Spring事件监听模式
 *
 * @author : pcitc
 */

public class MySpringApplicationEventDemo {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        //添加监听器
        ApplicationListener<MyApplicationEvent> listener = new ApplicationListener<MyApplicationEvent>() {
            @Override
            public void onApplicationEvent(MyApplicationEvent event) {
                System.out.println("Spring监听到事件变化:" + event.getContext());
            }
        };
        context.addApplicationListener(listener);

        context.refresh();
        context.publishEvent(new MyApplicationEvent("Hello World!", context));
        context.publishEvent(new MyApplicationEvent("abc", context));
    }
    /**
     * 定义一个监听的事件
     */
    private static class MyApplicationEvent extends ApplicationEvent{

        private ApplicationContext context ;

        public ApplicationContext getContext() {
            return context;
        }
        public MyApplicationEvent(Object source, ApplicationContext context) {
            super(source);
            this.context = context;
        }
    }
}
