import { c as create_ssr_component } from "../../../chunks/index3.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "body.svelte-1dwoq90{height:100%;background-color:#ADD8E6\n}div.svelte-1dwoq90{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%}label.svelte-1dwoq90{display:block;margin-bottom:0.5rem}input.svelte-1dwoq90{margin-bottom:1rem;padding:0.5rem;border-radius:0.25rem;border:1px solid #ccc}button.svelte-1dwoq90{padding:0.5rem 1rem;border-radius:0.25rem;background-color:#007bff;color:#fff;border:none;width:100%}p.svelte-1dwoq90{color:red;margin:0;padding:0}.error.svelte-1dwoq90{margin-top:20px}.input.svelte-1dwoq90{display:flex;flex-direction:column}.form.svelte-1dwoq90{display:flex;flex-direction:column}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  return `<body class="svelte-1dwoq90"><div class="svelte-1dwoq90"><h1>Welcome to the Admin Page</h1>

<h2>Please log in </h2>


<form class="form svelte-1dwoq90" method="POST"><div class="input svelte-1dwoq90"><label for="username" class="svelte-1dwoq90">Email:</label>
  <input type="email" id="email" name="email" class="svelte-1dwoq90"> 
  

  <label for="password" class="svelte-1dwoq90">Password:</label>
  <input type="password" id="password" name="password" class="svelte-1dwoq90"> 
  <button type="submit" class="svelte-1dwoq90">Login</button></div>

  ${form?.missing ? `<p class="error svelte-1dwoq90">Please provide a correct email</p>` : ``}
  ${form?.incorrect ? `<p class="error svelte-1dwoq90">Password or email incorrect. Try again</p>` : ``}</form></div></body>`;
});
export {
  Page as default
};
