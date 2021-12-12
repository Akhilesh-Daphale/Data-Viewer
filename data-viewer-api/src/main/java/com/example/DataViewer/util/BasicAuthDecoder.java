package com.example.DataViewer.util;

import java.util.Base64;

public final class BasicAuthDecoder {

    private final String username;
    private final String password;

    public BasicAuthDecoder(final String base64EncodedCredentials) {
        // Decode the basic auth string
        final String[] base64Decoded = new String(Base64.getDecoder()
                .decode(base64EncodedCredentials.split("Basic ")[1]))
                .split(":");
        this.username = base64Decoded[0];
        this.password = base64Decoded[1];
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
