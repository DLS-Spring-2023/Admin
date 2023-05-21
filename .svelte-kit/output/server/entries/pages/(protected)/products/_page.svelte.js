import { b as assign, n as now, l as loop, i as identity, c as create_ssr_component, a as subscribe, o as onDestroy, v as validate_component, m as missing_component, d as add_attribute, f as each, e as escape, h as null_to_empty } from "../../../../chunks/index3.js";
import { w as writable } from "../../../../chunks/index2.js";
const defaults = {
  duration: 4e3,
  initial: 1,
  next: 0,
  pausable: false,
  dismissable: true,
  reversed: false,
  intro: { x: 256 }
};
function createToast() {
  const { subscribe: subscribe2, update } = writable(new Array());
  const options = {};
  let count = 0;
  function _obj(obj) {
    return obj instanceof Object;
  }
  function _init(target = "default", opts = {}) {
    options[target] = opts;
    return options;
  }
  function push(msg, opts) {
    const param = {
      target: "default",
      ..._obj(msg) ? (
        /** @type {SvelteToastOptions} */
        msg
      ) : { ...opts, msg }
    };
    const conf = options[param.target] || {};
    const entry = {
      ...defaults,
      ...conf,
      ...param,
      theme: { ...conf.theme, ...param.theme },
      classes: [...conf.classes || [], ...param.classes || []],
      id: ++count
    };
    update((n) => entry.reversed ? [...n, entry] : [entry, ...n]);
    return count;
  }
  function pop(id) {
    update((n) => {
      if (!n.length || id === 0)
        return [];
      if (typeof id === "function")
        return n.filter((i) => id(i));
      if (_obj(id))
        return n.filter(
          /** @type {SvelteToastOptions[]} i */
          (i) => i.target !== id.target
        );
      const found = id || Math.max(...n.map((i) => i.id));
      return n.filter((i) => i.id !== found);
    });
  }
  function set(id, opts) {
    const param = _obj(id) ? id : { ...opts, id };
    update((n) => {
      const idx = n.findIndex((i) => i.id === param.id);
      if (idx > -1) {
        n[idx] = { ...n[idx], ...param };
      }
      return n;
    });
  }
  return { subscribe: subscribe2, push, pop, set, _init };
}
const toast = createToast();
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults2 = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults2), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const ToastItem_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "._toastItem.svelte-95rq8t{width:var(--toastWidth, 16rem);height:var(--toastHeight, auto);min-height:var(--toastMinHeight, 3.5rem);margin:var(--toastMargin, 0 0 0.5rem 0);padding:var(--toastPadding, 0);background:var(--toastBackground, rgba(66, 66, 66, 0.9));color:var(--toastColor, #fff);box-shadow:var(\n    --toastBoxShadow,\n    0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)\n  );border:var(--toastBorder, none);border-radius:var(--toastBorderRadius, 0.125rem);position:relative;display:flex;flex-direction:row;align-items:center;overflow:hidden;will-change:transform, opacity;-webkit-tap-highlight-color:transparent}._toastMsg.svelte-95rq8t{padding:var(--toastMsgPadding, 0.75rem 0.5rem);flex:1 1 0%}.pe.svelte-95rq8t,._toastMsg.svelte-95rq8t a{pointer-events:auto}._toastBtn.svelte-95rq8t{width:var(--toastBtnWidth, 2rem);height:var(--toastBtnHeight, 100%);cursor:pointer;outline:none}._toastBtn.svelte-95rq8t::after{content:var(--toastBtnContent, '✕');font:var(--toastBtnFont, 1rem sans-serif);display:flex;align-items:center;justify-content:center}._toastBar.svelte-95rq8t{top:var(--toastBarTop, auto);right:var(--toastBarRight, auto);bottom:var(--toastBarBottom, 0);left:var(--toastBarLeft, 0);height:var(--toastBarHeight, 6px);width:var(--toastBarWidth, 100%);position:absolute;display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:transparent;pointer-events:none}._toastBar.svelte-95rq8t::-webkit-progress-bar{background:transparent}._toastBar.svelte-95rq8t::-webkit-progress-value{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}._toastBar.svelte-95rq8t::-moz-progress-bar{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}",
  map: null
};
function check(prop, kind = "undefined") {
  return typeof prop === kind;
}
const ToastItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progress, $$unsubscribe_progress;
  let { item } = $$props;
  let next = item.initial;
  let cprops = {};
  const progress = tweened(item.initial, { duration: item.duration, easing: identity });
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  function close() {
    toast.pop(item.id);
  }
  function autoclose() {
    if ($progress === 1 || $progress === 0)
      close();
  }
  onDestroy(() => {
    if (check(item.onpop, "function")) {
      item.onpop(item.id);
    }
  });
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$3);
  {
    if (!check(item.progress)) {
      item.next = item.progress;
    }
  }
  {
    if (next !== item.next) {
      next = item.next;
      progress.set(next).then(autoclose);
    }
  }
  {
    if (item.component) {
      const { props = {}, sendIdTo } = item.component;
      cprops = {
        ...props,
        ...sendIdTo && { [sendIdTo]: item.id }
      };
    }
  }
  $$unsubscribe_progress();
  return `<div class="${["_toastItem svelte-95rq8t", item.pausable ? "pe" : ""].join(" ").trim()}"><div role="status" class="${["_toastMsg svelte-95rq8t", item.component ? "pe" : ""].join(" ").trim()}">${item.component ? `${validate_component(item.component.src || missing_component, "svelte:component").$$render($$result, Object.assign({}, cprops), {}, {})}` : `<!-- HTML_TAG_START -->${item.msg}<!-- HTML_TAG_END -->`}</div>
  ${item.dismissable ? `<div class="_toastBtn pe svelte-95rq8t" role="button" tabindex="0"></div>` : ``}
  <progress class="_toastBar svelte-95rq8t"${add_attribute("value", $progress, 0)}></progress>
</div>`;
});
const SvelteToast_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "._toastContainer.svelte-1u812xz{top:var(--toastContainerTop, 1.5rem);right:var(--toastContainerRight, 2rem);bottom:var(--toastContainerBottom, auto);left:var(--toastContainerLeft, auto);position:fixed;margin:0;padding:0;list-style-type:none;pointer-events:none;z-index:var(--toastContainerZIndex, 9999)}",
  map: null
};
function getCss(theme) {
  return theme ? Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "") : void 0;
}
const SvelteToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toast, $$unsubscribe_toast;
  $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
  let { options = {} } = $$props;
  let { target = "default" } = $$props;
  let items = [];
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  $$result.css.add(css$2);
  {
    toast._init(target, options);
  }
  items = $toast.filter((i) => i.target === target);
  $$unsubscribe_toast();
  return `<ul class="_toastContainer svelte-1u812xz">${each(items, (item) => {
    return `<li class="${escape(null_to_empty(item.classes?.join(" ")), true) + " svelte-1u812xz"}"${add_attribute("style", getCss(item.theme), 0)}>${validate_component(ToastItem, "ToastItem").$$render($$result, { item }, {}, {})}
    </li>`;
  })}
</ul>`;
});
const Navbar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "nav.svelte-c1gqzj.svelte-c1gqzj{display:flex;justify-content:space-between;align-items:center;background-color:#007bff;color:#fff;height:80px;padding:0 50px}.logo.svelte-c1gqzj.svelte-c1gqzj{font-size:2rem;font-weight:bold}.nav-links.svelte-c1gqzj.svelte-c1gqzj{display:flex;justify-content:space-between;width:50%;list-style:none}.nav-links.svelte-c1gqzj li.svelte-c1gqzj{display:flex;align-items:center}.nav-links.svelte-c1gqzj li a.svelte-c1gqzj,.nav-links.svelte-c1gqzj li button.svelte-c1gqzj{display:flex;align-items:center;color:#fff;text-decoration:none;font-size:1.2rem;font-weight:bold;padding:0.5rem 1rem;border-radius:4px;transition:all 0.3s ease;background-color:transparent;border:none;cursor:pointer}.nav-links.svelte-c1gqzj li a.svelte-c1gqzj:hover,.nav-links.svelte-c1gqzj li button.svelte-c1gqzj:hover{background-color:#fff;color:#007bff}",
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let links = [{ name: "Products", url: "/products" }];
  $$result.css.add(css$1);
  return `<nav class="svelte-c1gqzj"><div class="logo svelte-c1gqzj">Admin Panel</div>
  <ul class="nav-links svelte-c1gqzj">${each(links, (link) => {
    return `<li class="svelte-c1gqzj"><a${add_attribute("href", link.url, 0)} class="svelte-c1gqzj">${escape(link.name)}</a>
    </li>`;
  })}
    <li class="svelte-c1gqzj"><form method="post" action="/logout"><button type="submit" class="svelte-c1gqzj"><p>Logout</p></button></form></li></ul></nav>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.log{--toastBackground:green}form.svelte-11k3r03.svelte-11k3r03{margin:0;padding:0}body.svelte-11k3r03.svelte-11k3r03{height:100%;background-color:#ADD8E6}div.svelte-11k3r03.svelte-11k3r03{display:flex;flex-direction:column;align-items:center}table.svelte-11k3r03.svelte-11k3r03{margin:auto;border-collapse:collapse;width:80%;background-color:#fff;box-shadow:0 0 10px rgba(0, 0, 0, 0.3)}th.svelte-11k3r03.svelte-11k3r03,td.svelte-11k3r03.svelte-11k3r03{text-align:left;padding:8px;border-bottom:1px solid #ddd}th.svelte-11k3r03.svelte-11k3r03{background-color:#007bff;color:#fff;font-weight:bold}button.svelte-11k3r03.svelte-11k3r03{background-color:#007bff;color:#fff;border:none;padding:8px 12px;border-radius:4px;cursor:pointer}button.svelte-11k3r03.svelte-11k3r03:hover{background-color:#0056b3}.dialog-form.svelte-11k3r03.svelte-11k3r03{display:flex;flex-direction:column;align-items:center;margin-top:20px}.dialog-form.svelte-11k3r03 label.svelte-11k3r03{display:flex;flex-direction:column;margin-bottom:10px}.dialog-form.svelte-11k3r03 input.svelte-11k3r03{padding:5px;border:none;border-radius:3px;margin-top:5px}.dialog-form.svelte-11k3r03 button.svelte-11k3r03{background-color:#007bff;color:#fff;border:none;padding:8px 12px;border-radius:4px;margin-top:20px;cursor:pointer}.dialog-form.svelte-11k3r03 button.svelte-11k3r03:hover{background-color:#0056b3}.dialog-form.svelte-11k3r03 button[type="button"].svelte-11k3r03{background-color:#6c757d;margin-right:10px}.header_actions.svelte-11k3r03.svelte-11k3r03{text-align:center}.products__button.svelte-11k3r03.svelte-11k3r03{margin-bottom:0.75rem}.actions.svelte-11k3r03.svelte-11k3r03{flex-direction:row;justify-content:center}.edit_button.svelte-11k3r03.svelte-11k3r03{margin-right:10px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let action;
  let { data } = $$props;
  const products = data.products;
  let emptyProduct = {
    product_id: 0,
    name: "",
    price: 0,
    description: "",
    tags: [""],
    photo_url: "",
    productStock: { quantity: 0 }
  };
  let selectedProduct = emptyProduct;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<body class="svelte-11k3r03">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
${validate_component(SvelteToast, "SvelteToast").$$render($$result, { options: { classes: ["log"] } }, {}, {})}
<div class="svelte-11k3r03">${data ? `<h1>Products</h1>
<div class="products__button svelte-11k3r03"><button class="svelte-11k3r03">Add product</button></div>
<table class="svelte-11k3r03"><thead><tr><th class="svelte-11k3r03">Name</th>
      <th class="svelte-11k3r03">Price</th>
      <th class="svelte-11k3r03">Description</th>
      <th class="svelte-11k3r03">Tags</th>
	  <th class="svelte-11k3r03">Photo</th>
	  <th class="header_actions svelte-11k3r03">Actions</th></tr></thead>
  <tbody>${each(products, (product) => {
    return `<tr><td class="svelte-11k3r03">${escape(product.name)}</td>
        <td class="svelte-11k3r03">${escape(product.price)}</td>
		<td class="svelte-11k3r03">${escape(product.description)}</td>
		<td class="svelte-11k3r03">${escape(product.tags)}</td>
		<td class="svelte-11k3r03">${product.photo_url && product.photo_url.includes("http") ? `<img${add_attribute("src", product.photo_url, 0)} alt="product-photo">` : `No photo`}</td>
        <td class="svelte-11k3r03"><div class="actions svelte-11k3r03"><button class="edit_button svelte-11k3r03">Edit</button>
			<form method="POST" action="?/removeProduct" class="svelte-11k3r03"><input type="hidden" name="productId"${add_attribute("value", product.product_id, 0)}>
			<button class="svelte-11k3r03">Remove</button></form>
		</div></td>
      </tr>`;
  })}</tbody></table>` : ``}</div>


<dialog id="confirmation-dialog"><div class="dialog-form svelte-11k3r03"><form method="POST" action="${"?/" + escape(action, true)}" class="svelte-11k3r03"><label class="svelte-11k3r03">Name:
		  <input type="text" name="name" required class="svelte-11k3r03"${add_attribute("value", selectedProduct.name, 0)}></label>
		<label class="svelte-11k3r03">Price:
		  <input type="number" name="price" required class="svelte-11k3r03"${add_attribute("value", selectedProduct.price, 0)}></label>
		<label class="svelte-11k3r03">Description:
		  <textarea name="description">${""}</textarea></label>
		<label class="svelte-11k3r03">Tags:
		  <input type="text" name="tags" required class="svelte-11k3r03"${add_attribute("value", selectedProduct.tags, 0)}></label>
		<label class="svelte-11k3r03">Photo URL:
		  <input type="text" name="photo_url" class="svelte-11k3r03"${add_attribute("value", selectedProduct.photo_url, 0)}></label>
		${`<input type="hidden" name="productId"${add_attribute("value", selectedProduct.product_id, 0)} class="svelte-11k3r03">`}
		<button type="submit" class="svelte-11k3r03">Save</button>
		<button type="button" class="svelte-11k3r03">Cancel</button></form></div></dialog></body>`;
});
export {
  Page as default
};
