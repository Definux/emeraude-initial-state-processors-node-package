import initialState from "./initialState";

export default {
    created() {
        this.$store.registerModule('main', initialState);
        this.$store.dispatch('mapInitialState');
        this.$i18n.locale = this.$store.getters.languageCode;
    }
}