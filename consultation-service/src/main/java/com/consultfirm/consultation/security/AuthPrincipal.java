package com.consultfirm.consultation.security;

public record AuthPrincipal(String userId, String email, String role, String name) {
}
