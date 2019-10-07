package com.adobe.cloud.admin;

import java.util.Calendar;
import java.util.Set;

import com.drew.lang.annotations.NotNull;
import com.drew.lang.annotations.Nullable;

import org.osgi.annotation.versioning.ProviderType;

/**
 * Represents an Activation DTM configuration item from {@code /conf}.
 * <p>
 * The configuration might be of type {@code sling:Folder} or
 * {@code cq/dtm-reactor/component/conf/page}.
 * </p>
 */
@ProviderType
public interface Configuration {

    /**
     * Returns the title of the item.
     * 
     * @return Item title or resource name if none found. Returns never {@code null}
     */
    @NotNull
    String getTitle();

    /**
     * Indicates if item has children.
     * 
     * @return {@code true} if item has children
     */
    @NotNull
    boolean hasChildren();

    /**
     * Returns the last modified time stamp.
     * 
     * @return Last modified time in milliseconds or {@code null}
     */
    @Nullable
    Calendar getLastModifiedDate();

    /**
     * Returns the user which last modified the item
     * 
     * @return User identifier or {@code null}
     */
    @Nullable
    String getLastModifiedBy();

    /**
     * Returns the last published time stamp.
     * 
     * @return Last published time in milliseconds or {@code null}
     */
    @Nullable
    Calendar getLastPublishedDate();

    /**
     * Returns a list of quickactions rel identifiers for that item.
     * 
     * @return List of quickactions rel identifiers or an empty list
     */
    @NotNull
    Set<String> getQuickactionsRels();
}