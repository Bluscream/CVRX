// #region | API: Avatar

const avatarReq = {
    /**
     * @param {{ avatarId: string }} params
     * @returns {Promise<{json: any, params}>}
     */
    getAvatar(params) {
        return window.API.call(`avatars/${params.avatarId}`, {
            method: 'GET'
        }).then((json) => {
            const args = {
                json,
                params
            };
            window.API.$emit('AVATAR', args);
            return args;
        });
    },

    /**
     * @typedef {{
     *     n: number,
     *     offset: number,
     *     search: string,
     *     userId: string,
     *     user: 'me' | 'friends'
     *     sort: 'created' | 'updated' | 'order' | '_created_at' | '_updated_at',
     *     order: 'ascending' | 'descending',
     *     releaseStatus: 'public' | 'private' | 'hidden' | 'all',
     *     featured: boolean
     * }} GetAvatarsParameter
     */
    /**
     *
     * @param {GetAvatarsParameter} params
     * @returns {Promise<{json: any, params}>}
     */
    getAvatars(params) {
        return window.API.call('avatars', {
            method: 'GET',
            params
        }).then((json) => {
            const args = {
                json,
                params
            };
            window.API.$emit('AVATAR:LIST', args);
            return args;
        });
    },
    /**
     * @param {{ id: string, releaseStatus: 'public' | 'private' }} params
     * @returns {Promise<{json: any, params}>}
     */
    saveAvatar(params) {
        return window.API.call(`avatars/${params.id}`, {
            method: 'PUT',
            params
        }).then((json) => {
            const args = {
                json,
                params
            };
            window.API.$emit('AVATAR:SAVE', args);
            return args;
        });
    },

    /**
     * @param {{avatarId: string }} params
     * @returns {Promise<{json: any, params}>}
     */
    selectAvatar(params) {
        return window.API.call(`avatars/${params.avatarId}/select`, {
            method: 'PUT',
            params
        }).then((json) => {
            const args = {
                json,
                params
            };
            window.API.$emit('AVATAR:SELECT', args);
            return args;
        });
    },

    /**
     * @param {{ avatarId: string }} params
     * @return { Promise<{json: any, params}> }
     */
    selectFallbackAvatar(params) {
        return window.API.call(`avatars/${params.avatarId}/selectfallback`, {
            method: 'PUT',
            params
        }).then((json) => {
            const args = {
                json,
                params
            };
            window.API.$emit('AVATAR:SELECT', args);
            return args;
        });
    },

    /**
     * @param {{ avatarId: string }} params
     * @return { Promise<{json: any, params}> }
     */
    deleteAvatar(params) {
        return window.API.call(`avatars/${params.avatarId}`, {
            method: 'DELETE'
        }).then((json) => {
            const args = {
                json,
                params
            };
            window.API.$emit('AVATAR:DELETE', args);
            return args;
        });
    },

    /**
     * @param {{ avatarId: string }} params
     * @returns {Promise<{json: any, params}>}
     */
    createImposter(params) {
        return window.API.call(`avatars/${params.avatarId}/impostor/enqueue`, {
            method: 'POST'
        }).then((json) => {
            const args = {
                json,
                params
            };
            // window.API.$emit('AVATAR:IMPOSTER:CREATE', args);
            return args;
        });
    },

    /**
     * @param {{ avatarId: string }} params
     * @returns {Promise<{json: T, params}>}
     */
    deleteImposter(params) {
        return window.API.call(`avatars/${params.avatarId}/impostor`, {
            method: 'DELETE'
        }).then((json) => {
            const args = {
                json,
                params
            };
            // window.API.$emit('AVATAR:IMPOSTER:DELETE', args);
            return args;
        });
    },

    /**
     * @returns {Promise<{json: any, params}>}
     */
    getAvailableAvatarStyles() {
        return window.API.call('avatarStyles', {
            method: 'GET'
        }).then((json) => {
            const args = {
                json
            };
            // window.API.$emit('AVATAR:STYLES', args);
            return args;
        });
    },

    /**
     * @param {{ avatarId: string }} params
     * @returns {Promise<{json: any, params}>}
     */
    getAvatarGallery(avatarId) {
        const params = {
            tag: 'avatargallery',
            galleryId: avatarId,
            n: 100,
            offset: 0
        };
        return window.API.call(`files`, {
            params,
            method: 'GET'
        }).then((json) => {
            const args = {
                json,
                params
            };
            // window.API.$emit('AVATAR:GALLERY', args);
            return args;
        });
    },

    /**
     * @param {{ imageData: string, avatarId: string }} params
     * @returns {Promise<{json: any, params}>}
     */
    uploadAvatarGalleryImage(imageData, avatarId) {
        const params = {
            tag: 'avatargallery',
            galleryId: avatarId
        };
        return window.API.call('file/image', {
            uploadImage: true,
            matchingDimensions: false,
            postData: JSON.stringify(params),
            imageData
        }).then((json) => {
            const args = {
                json,
                params
            };
            // window.API.$emit('AVATARGALLERYIMAGE:ADD', args);
            return args;
        });
    },

    /**
     * @param {string[]} order
     * @returns {Promise<{json: any, params}>}
     */
    setAvatarGalleryOrder(order) {
        const params = {
            ids: order
        };
        return window.API.call('files/order', {
            method: 'PUT',
            params
        }).then((json) => {
            const args = {
                json,
                params
            };
            // window.API.$emit('AVATARGALLERYIMAGE:ORDER', args);
            return args;
        });
    }
};
// #endregion

export default avatarReq;
