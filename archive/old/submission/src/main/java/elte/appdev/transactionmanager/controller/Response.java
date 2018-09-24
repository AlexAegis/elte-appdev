package elte.appdev.transactionmanager.controller;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Response<T> {
    private String error;
    private T data;

    public static <T> Response<T> ok(T data) {
        return new Response<>(null, data);
    }
    public static <T> Response<T> error(String message, T data) {
        return new Response<>(message, data);
    }
}
