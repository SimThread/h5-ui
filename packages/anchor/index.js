export default {
    install(Vue, options) {
        Vue.directive("anchor", {
            bind(el, binding) {
                let reserve = binding.value.reserve || 0;
                el.onclick = function () {
                    let total;
                    if (binding.value.index == 0) {
                        total = 0;
                    } else {
                        total = document.getElementById(`anchor-${binding.value.index}`).offsetTop - reserve;
                    }

                    // 滚动距离
                    let distance = document.documentElement.scrollTop || document.body.scrollTop;
                    let step = total / 50;
                    if (total > distance) {
                        (function smoothDown() {
                            if (distance < total) {
                                // 缓动效果
                                distance += step;
                                document.documentElement.scrollTop = distance;
                                document.body.scrollTop = distance;
                                setTimeout(smoothDown, 5);
                            } else {
                                document.documentElement.scrollTop = total;
                                document.body.scrollTop = total;
                            }
                        }());
                    } else {
                        const newTotal = distance - total;
                        step = newTotal / 50;
                        (function smoothUp() {
                            if (distance > total) {
                                // 缓动效果
                                distance -= step;
                                document.documentElement.scrollTop = distance;
                                document.body.scrollTop = distance;
                                setTimeout(smoothUp, 5);
                            } else {
                                document.documentElement.scrollTop = total;
                                document.body.scrollTop = total;
                            }
                        }());
                    }
                };
            },
        });
    }
};