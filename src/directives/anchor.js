export default {
  name: 'anchor',
  beforeMount(el, binding) {
    el.distance = Number.parseFloat(el.getAttribute('anchor-distance')) || 0;
    el.onclick = function () {
      let total;
      if (binding.value === 0) {
        total = 0;
      } else {
        total =
          document.getElementById(`anchor-${binding.value}`).offsetTop -
          el.distance;
      }

      // 滚动距离
      let scrollDistance =
        document.documentElement.scrollTop || document.body.scrollTop;
      let step = total / 50;
      if (total > scrollDistance) {
        (function smoothDown() {
          if (scrollDistance < total) {
            // 缓动效果
            scrollDistance += step;
            document.documentElement.scrollTop = scrollDistance;
            document.body.scrollTop = scrollDistance;
            setTimeout(smoothDown, 5);
          } else {
            document.documentElement.scrollTop = total;
            document.body.scrollTop = total;
          }
        })();
      } else {
        const newTotal = scrollDistance - total;
        step = newTotal / 50;
        (function smoothUp() {
          if (scrollDistance > total) {
            // 缓动效果
            scrollDistance -= step;
            document.documentElement.scrollTop = scrollDistance;
            document.body.scrollTop = scrollDistance;
            setTimeout(smoothUp, 5);
          } else {
            document.documentElement.scrollTop = total;
            document.body.scrollTop = total;
          }
        })();
      }
    };
  },
  updated: function update(el, bidding) {
    if (el) {
      el.distance = Number.parseFloat(el.getAttribute('anchor-distance')) || 0;
    }
  },
};
