<template>
    <safe-dialog ref="favoriteDialogRef" :visible.sync="isVisible" :title="t('dialog.favorite.header')" width="300px">
        <div v-loading="loading">
            <span style="display: block; text-align: center">{{ t('dialog.favorite.vrchat_favorites') }}</span>
            <template v-if="favoriteDialog.currentGroup && favoriteDialog.currentGroup.key">
                <el-button
                    style="display: block; width: 100%; margin: 10px 0"
                    @click="deleteFavoriteNoConfirm(favoriteDialog.objectId)">
                    <i class="el-icon-check"></i>
                    {{ favoriteDialog.currentGroup.displayName }} ({{ favoriteDialog.currentGroup.count }} /
                    {{ favoriteDialog.currentGroup.capacity }})
                </el-button>
            </template>
            <template v-else>
                <el-button
                    v-for="group in groups"
                    :key="group.key"
                    style="display: block; width: 100%; margin: 10px 0"
                    @click="addFavorite(group)">
                    {{ group.displayName }} ({{ group.count }} / {{ group.capacity }})
                </el-button>
            </template>
        </div>
        <div v-if="favoriteDialog.type === 'world'" style="margin-top: 20px">
            <span style="display: block; text-align: center">{{ t('dialog.favorite.local_favorites') }}</span>
            <template v-for="group in localWorldFavoriteGroups">
                <el-button
                    v-if="hasLocalWorldFavorite(favoriteDialog.objectId, group)"
                    :key="group"
                    style="display: block; width: 100%; margin: 10px 0"
                    @click="removeLocalWorldFavorite(favoriteDialog.objectId, group)">
                    <i class="el-icon-check"></i>
                    {{ group }} ({{ getLocalWorldFavoriteGroupLength(group) }})
                </el-button>
                <el-button
                    v-else
                    :key="group"
                    style="display: block; width: 100%; margin: 10px 0"
                    @click="addLocalWorldFavorite(favoriteDialog.objectId, group)">
                    {{ group }} ({{ getLocalWorldFavoriteGroupLength(group) }})
                </el-button>
            </template>
        </div>
        <div v-if="favoriteDialog.type === 'avatar'" style="margin-top: 20px">
            <span style="display: block; text-align: center">{{ t('dialog.favorite.local_avatar_favorites') }}</span>
            <template v-for="group in localAvatarFavoriteGroups">
                <el-button
                    v-if="hasLocalAvatarFavorite(favoriteDialog.objectId, group)"
                    :key="group"
                    style="display: block; width: 100%; margin: 10px 0"
                    @click="removeLocalAvatarFavorite(favoriteDialog.objectId, group)">
                    <i class="el-icon-check"></i>
                    {{ group }} ({{ getLocalAvatarFavoriteGroupLength(group) }})
                </el-button>
                <el-button
                    v-else
                    :key="group"
                    style="display: block; width: 100%; margin: 10px 0"
                    :disabled="!isLocalUserVrcplusSupporter"
                    @click="addLocalAvatarFavorite(favoriteDialog.objectId, group)">
                    {{ group }} ({{ getLocalAvatarFavoriteGroupLength(group) }})
                </el-button>
            </template>
        </div>
    </safe-dialog>
</template>

<script setup>
    import Noty from 'noty';
    import { storeToRefs } from 'pinia';
    import { computed, nextTick, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n-bridge';
    import { favoriteRequest } from '../../api';
    import { adjustDialogZ } from '../../shared/utils';
    import { useFavoriteStore, useUserStore } from '../../stores';

    const { t } = useI18n();

    const favoriteStore = useFavoriteStore();
    const {
        favoriteFriendGroups,
        favoriteAvatarGroups,
        favoriteWorldGroups,
        localAvatarFavoriteGroups,
        favoriteDialog,
        localWorldFavoriteGroups
    } = storeToRefs(favoriteStore);
    const {
        getLocalWorldFavoriteGroupLength,
        addLocalWorldFavorite,
        hasLocalWorldFavorite,
        hasLocalAvatarFavorite,
        addLocalAvatarFavorite,
        getLocalAvatarFavoriteGroupLength,
        removeLocalAvatarFavorite,
        removeLocalWorldFavorite,
        deleteFavoriteNoConfirm
    } = favoriteStore;
    const { currentUser } = storeToRefs(useUserStore());

    const favoriteDialogRef = ref(null);
    const groups = ref([]);
    const loading = ref(false);

    const isVisible = computed({
        get: () => favoriteDialog.value.visible,
        set: (v) => {
            favoriteDialog.value.visible = v;
        }
    });

    const isLocalUserVrcplusSupporter = computed(() => currentUser.value.$isVRCPlus);

    watch(
        () => favoriteDialog.value.visible,
        async (value) => {
            if (value) {
                initFavoriteDialog();
                await nextTick();
                adjustDialogZ(favoriteDialogRef.value.$el);
            }
        }
    );

    function initFavoriteDialog() {
        if (favoriteDialog.value.type === 'friend') {
            groups.value = favoriteFriendGroups.value;
        } else if (favoriteDialog.value.type === 'world') {
            groups.value = favoriteWorldGroups.value;
        } else if (favoriteDialog.value.type === 'avatar') {
            groups.value = favoriteAvatarGroups.value;
        }
    }

    function addFavorite(group) {
        const D = favoriteDialog.value;
        loading.value = true;
        favoriteRequest
            .addFavorite({
                type: D.type,
                favoriteId: D.objectId,
                tags: group.name
            })
            .then(() => {
                isVisible.value = false;
                new Noty({ type: 'success', text: 'favorite added!' }).show();
            })
            .finally(() => {
                loading.value = false;
            });
    }
</script>
