package com.adobe.cloud.fonts;

import com.drew.lang.annotations.NotNull;
import com.drew.lang.annotations.Nullable;

import org.apache.sling.api.SlingHttpServletRequest;
import org.osgi.annotation.versioning.ProviderType;

/**
 * Provides an interface to retrieve {@code Settings} for a
 * {@link SlingHttpServletRequest}.
 */
@ProviderType
public interface SettingsProvider {

    /**
     * Returns the {@link Settings} for the specified {@code request}.
     *
     * @param request SlingHttpServletRequest
     * @return the {@link Settings} or {@code null} if not applicable for the
     *         {@code request}
     * @throws IllegalArgumentException if {@code request} argument is
     *             {@code null}
     */
    @Nullable
    Settings getSettings(@Nullable SlingHttpServletRequest request, @NotNull String configName);

}
