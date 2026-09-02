package com.consultfirm.notification.security;

public record AuthPrincipal(String userId, String email, String role, String name) {
}
