package com.adobe.cloud.fonts;

import com.drew.lang.annotations.NotNull;
import com.drew.lang.annotations.Nullable;

import org.osgi.annotation.versioning.ProviderType;

/**
 * Defines the {@code ScriptTag} Sling Model used for the
 * {@code cq/dtm-reactor/components/scripttag} component.
 */
@ProviderType
public interface Tag {

    @Nullable
    String getId();

    @NotNull
    String getEmbedType();

    @NotNull
    String getUrl();
}
