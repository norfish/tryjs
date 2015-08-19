/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/7/20 22:34
 */

module.exports = function (tree, callback) {
  (function walk(node, parent, key) {
    Object.keys(node).forEach(function(key) {
      if (key == 'parent') return;

      var child = node[key];
      if (Array.isArray(child)) {
        child.forEach(function(c, i) {
          if (c && typeof c.type === 'string') {
            walk(c, child, i);
          }
        });
      } else if (child && typeof child.type == 'string') {
        walk(child, node, key);
      }

    });
    callback(node, parent, key);
  })(tree, undefined, undefined);
};
