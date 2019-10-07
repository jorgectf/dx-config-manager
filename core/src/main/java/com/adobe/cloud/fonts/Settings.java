package com.adobe.cloud.fonts;

import org.osgi.annotation.versioning.ProviderType;

import com.drew.lang.annotations.NotNull;
import com.drew.lang.annotations.Nullable;

@ProviderType
public interface Settings {

    @Nullable
    String getId();

    @NotNull
    String getEmbedType();

    @NotNull
    String getUrl();
}
