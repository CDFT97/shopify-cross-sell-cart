!(function () {
  if (window && window.Shopify) {
    const a = {
        add: "SCE:add",
        update: "SCE:update",
        change: "SCE:change",
        clear: "SCE:clear",
        mutate: "SCE:mutate",
      },
      c = [
        "/cart/add",
        "/cart/update",
        "/cart/change",
        "/cart/clear",
        "/cart/add.js",
        "/cart/update.js",
        "/cart/change.js",
        "/cart/clear.js",
      ];
    if (window.fetch && "function" == typeof window.fetch) {
      const d = window.fetch;
      window.fetch = function () {
        const t = d.apply(this, arguments);
        return (
          e(arguments[0]) &&
            t.then((e) => {
              e.clone()
                .json()
                .then((t) => n(e.url, t));
            }),
          t
        );
      };
    }
    if (window.XMLHttpRequest) {
      const i = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function () {
        const t = arguments[1];
        return (
          this.addEventListener("load", function () {
            e(t) && n(t, this.response);
          }),
          i.apply(this, arguments)
        );
      };
    }
    function e(t) {
      if (t) return (t = t.split("/").pop()), c.includes("/cart/" + t);
    }
    function n(t, e) {
      if ("string" == typeof e)
        try {
          e = JSON.parse(e);
        } catch {}
      window.dispatchEvent(new CustomEvent(a.mutate, { detail: e }));
      t =
        !!(t = t) &&
        (t.includes("cart/add")
          ? "add"
          : t.includes("cart/update")
          ? "update"
          : t.includes("cart/change")
          ? "change"
          : !!t.includes("cart/clear") && "clear");
      switch (t) {
        case "add":
          window.dispatchEvent(new CustomEvent(a.add, { detail: e }));
          break;
        case "update":
          window.dispatchEvent(new CustomEvent(a.update, { detail: e }));
          break;
        case "change":
          window.dispatchEvent(new CustomEvent(a.change, { detail: e }));
          break;
        case "clear":
          window.dispatchEvent(new CustomEvent(a.clear, { detail: e }));
      }
    }
  }
})();
