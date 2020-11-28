const redirectToLogin = function(redirectUrl) {
    location.href = '/login?ReturnUrl=' + encodeURIComponent(redirectUrl);
};

const notFoundResult = function() {
    location.href = '/404';
};

module.exports = function (router, store) {
    router.beforeEach((routeTo, routeFrom, next) => {
        if (typeof(fetch) !== undefined) {
            if (store.getters.stateString !== undefined) {
                fetch(routeTo.path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: null,
                    credentials: 'include'
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }

                        notFoundResult();
                    })
                    .then(responseData => {
                        store.dispatch('updateViewData', responseData.viewData);
                        store.dispatch('updateViewModel', responseData.viewModel);
                        store.dispatch('updateMetaTags', responseData.metaTags);
                        next();
                    })
                    .catch(() => {
                        redirectToLogin(routeTo.path);
                    });
            }
            else {
                next();
            }
        }
        else {
            if (process.env.VUE_ENV === 'server') {
                next();
            }
            else {
                redirectToLogin('/');
            }
        }
    });
};