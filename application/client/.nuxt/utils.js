import Vue from 'vue'
import { isSamePath as _isSamePath, joinURL, normalizeURL, withQuery, withoutTrailingSlash } from 'ufo'

// window.{{globals.loadedCallback}} hook
// Useful for jsdom testing or plugins (https://github.com/tmpvar/jsdom#dealing-with-asynchronous-script-loading)
if (process.client) {
  window.onNuxtReadyCbs = []
  window.onNuxtReady = (cb) => {
    window.onNuxtReadyCbs.push(cb)
  }
}

export function createGetCounter (counterObject, defaultKey = '') {
  return function getCounter (id = defaultKey) {
    if (counterObject[id] === undefined) {
      counterObject[id] = 0
    }
    return counterObject[id]++
  }
}

export function empty () {}

export function globalHandleError (error) {
  if (Vue.config.errorHandler) {
    Vue.config.errorHandler(error)
  }
}

export function interopDefault (promise) {
  return promise.then(m => m.default || m)
}

export function hasFetch(vm) {
  return vm.$options && typeof vm.$options.fetch === 'function' && !vm.$options.fetch.length
}
export function purifyData(data) {
  if (process.env.NODE_ENV === 'production') {
    return data
  }

  return Object.entries(data).filter(
    ([key, value]) => {
      const valid = !(value instanceof Function) && !(value instanceof Promise)
      if (!valid) {
        console.warn(`${key} is not able to be stringified. This will break in a production environment.`)
      }
      return valid
    }
    ).reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
}
export function getChildrenComponentInstancesUsingFetch(vm, instances = []) {
  const children = vm.$children || []
  for (const child of children) {
    if (child.$fetch) {
      instances.push(child)
      continue; // Don't get the children since it will reload the template
    }
    if (child.$children) {
      getChildrenComponentInstancesUsingFetch(child, instances)
    }
  }
  return instances
}

export function applyAsyncData (Component, asyncData) {
  if (
    // For SSR, we once all this function without second param to just apply asyncData
    // Prevent doing this for each SSR request
    !asyncData && Component.options.__hasNuxtData
  ) {
    return
  }

  const ComponentData = Component.options._originDataFn || Component.options.data || function () { return {} }
  Component.options._originDataFn = ComponentData

  Component.options.data = function () {
    const data = ComponentData.call(this, this)
    if (this.$ssrContext) {
      asyncData = this.$ssrContext.asyncData[Component.cid]
    }
    return { ...data, ...asyncData }
  }

  Component.options.__hasNuxtData = true

  if (Component._Ctor && Component._Ctor.options) {
    Component._Ctor.options.data = Component.options.data
  }
}

export function sanitizeComponent (Component) {
  // If Component already sanitized
  if (Component.options && Component._Ctor === Component) {
    return Component
  }
  if (!Component.options) {
    Component = Vue.extend(Component) // fix issue #6
    Component._Ctor = Component
  } else {
    Component._Ctor = Component
    Component.extendOptions = Component.options
  }
  // If no component name defined, set file path as name, (also fixes #5703)
  if (!Component.options.name && Component.options.__file) {
    Component.options.name = Component.options.__file
  }
  return Component
}

export function getMatchedComponents (route, matches = false, prop = 'components') {
  return Array.prototype.concat.apply([], route.matched.map((m, index) => {
    return Object.keys(m[prop]).map((key) => {
      matches && matches.push(index)
      return m[prop][key]
    })
  }))
}

export function getMatchedComponentsInstances (route, matches = false) {
  return getMatchedComponents(route, matches, 'instances')
}

export function flatMapComponents (route, fn) {
  return Array.prototype.concat.apply([], route.matched.map((m, index) => {
    return Object.keys(m.components).reduce((promises, key) => {
      if (m.components[key]) {
        promises.push(fn(m.components[key], m.instances[key], m, key, index))
      } else {
        delete m.components[key]
      }
      return promises
    }, [])
  }))
}

export function resolveRouteComponents (route, fn) {
  return Promise.all(
    flatMapComponents(route, async (Component, instance, match, key) => {
      // If component is a function, resolve it
      if (typeof Component === 'function' && !Component.options) {
        try {
          Component = await Component()
        } catch (error) {
          // Handle webpack chunk loading errors
          // This may be due to a new deployment or a network problem
          if (
            error &&
            error.name === 'ChunkLoadError' &&
            typeof window !== 'undefined' &&
            window.sessionStorage
          ) {
            const timeNow = Date.now()
            const previousReloadTime = parseInt(window.sessionStorage.getItem('nuxt-reload'))

            // check for previous reload time not to reload infinitely
            if (!previousReloadTime || previousReloadTime + 60000 < timeNow) {
              window.sessionStorage.setItem('nuxt-reload', timeNow)
              window.location.reload(true /* skip cache */)
            }
          }

          throw error
        }
      }
      match.components[key] = Component = sanitizeComponent(Component)
      return typeof fn === 'function' ? fn(Component, instance, match, key) : Component
    })
  )
}

export async function getRouteData (route) {
  if (!route) {
    return
  }
  // Make sure the components are resolved (code-splitting)
  await resolveRouteComponents(route)
  // Send back a copy of route with meta based on Component definition
  return {
    ...route,
    meta: getMatchedComponents(route).map((Component, index) => {
      return { ...Component.options.meta, ...(route.matched[index] || {}).meta }
    })
  }
}

export async function setContext (app, context) {
  // If context not defined, create it
  if (!app.context) {
    app.context = {
      isStatic: process.static,
      isDev: true,
      isHMR: false,
      app,

      payload: context.payload,
      error: context.error,
      base: app.router.options.base,
      env: {"API_URL":"http://localhost:3030","ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\Cameron Paczek\\AppData\\Roaming","asl.log":"Destination=file","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"DESKTOP-TFJHU0M","ComSpec":"C:\\Windows\\system32\\cmd.exe","dp0":"C:\\Users\\Cameron Paczek\\professor-team-3-1\\application\\client\\node_modules\\.bin\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","HOME":"C:\\Users\\Cameron Paczek","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\Cameron Paczek","IDEA_INITIAL_DIRECTORY":"C:\\Users\\Cameron Paczek\\AppData\\Local\\JetBrains\\Toolbox\\apps\\WebStorm\\ch-0\\212.5457.55\\bin","INIT_CWD":"C:\\Users\\Cameron Paczek\\professor-team-3-1\\application\\client","INTEL_DEV_REDIST":"C:\\Program Files (x86)\\Common Files\\Intel\\Shared Libraries\\","LOCALAPPDATA":"C:\\Users\\Cameron Paczek\\AppData\\Local","LOGONSERVER":"\\\\DESKTOP-TFJHU0M","MIC_LD_LIBRARY_PATH":"C:\\Program Files (x86)\\Common Files\\Intel\\Shared Libraries\\compiler\\lib\\mic","NODE":"C:\\Program Files\\nodejs\\node.exe","NODE_ENV":"development","NODE_EXE":"C:\\Program Files\\nodejs\\\\node.exe","NPM_CLI_JS":"C:\\Program Files\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js","npm_config_access":"","npm_config_allow_same_version":"","npm_config_also":"","npm_config_always_auth":"","npm_config_argv":"{\"remain\":[],\"cooked\":[\"run\",\"dev\"],\"original\":[\"run\",\"dev\"]}","npm_config_audit":"true","npm_config_audit_level":"low","npm_config_auth_type":"legacy","npm_config_before":"","npm_config_bin_links":"true","npm_config_browser":"","npm_config_ca":"","npm_config_cache":"C:\\Users\\CAMERO~1\\AppData\\Roaming\\npm-cache","npm_config_cache_lock_retries":"10","npm_config_cache_lock_stale":"60000","npm_config_cache_lock_wait":"10000","npm_config_cache_max":"Infinity","npm_config_cache_min":"10","npm_config_cafile":"","npm_config_cert":"","npm_config_cidr":"","npm_config_color":"true","npm_config_commit_hooks":"true","npm_config_depth":"Infinity","npm_config_description":"true","npm_config_dev":"","npm_config_dry_run":"","npm_config_editor":"notepad.exe","npm_config_engine_strict":"","npm_config_fetch_retries":"2","npm_config_fetch_retry_factor":"10","npm_config_fetch_retry_maxtimeout":"60000","npm_config_fetch_retry_mintimeout":"10000","npm_config_force":"","npm_config_format_package_lock":"true","npm_config_fund":"true","npm_config_git":"git","npm_config_git_tag_version":"true","npm_config_global":"","npm_config_globalconfig":"C:\\Users\\Cameron Paczek\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_globalignorefile":"C:\\Users\\Cameron Paczek\\AppData\\Roaming\\npm\\etc\\npmignore","npm_config_global_style":"","npm_config_group":"","npm_config_ham_it_up":"","npm_config_heading":"npm","npm_config_https_proxy":"","npm_config_if_present":"","npm_config_ignore_prepublish":"","npm_config_ignore_scripts":"","npm_config_init_author_email":"","npm_config_init_author_name":"","npm_config_init_author_url":"","npm_config_init_license":"ISC","npm_config_init_module":"C:\\Users\\Cameron Paczek\\.npm-init.js","npm_config_init_version":"1.0.0","npm_config_json":"","npm_config_key":"","npm_config_legacy_bundling":"","npm_config_link":"","npm_config_local_address":"","npm_config_loglevel":"notice","npm_config_logs_max":"10","npm_config_long":"","npm_config_maxsockets":"50","npm_config_message":"%s","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_node_gyp":"C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_node_options":"","npm_config_node_version":"14.17.6","npm_config_noproxy":"","npm_config_offline":"","npm_config_onload_script":"","npm_config_only":"","npm_config_optional":"true","npm_config_otp":"","npm_config_package_lock":"true","npm_config_package_lock_only":"","npm_config_parseable":"","npm_config_prefer_offline":"","npm_config_prefer_online":"","npm_config_prefix":"C:\\Users\\Cameron Paczek\\AppData\\Roaming\\npm","npm_config_preid":"","npm_config_production":"","npm_config_progress":"true","npm_config_proxy":"","npm_config_read_only":"","npm_config_rebuild_bundle":"true","npm_config_registry":"https://registry.npmjs.org/","npm_config_rollback":"true","npm_config_save":"true","npm_config_save_bundle":"","npm_config_save_dev":"","npm_config_save_exact":"","npm_config_save_optional":"","npm_config_save_prefix":"^","npm_config_save_prod":"","npm_config_scope":"","npm_config_scripts_prepend_node_path":"warn-only","npm_config_script_shell":"","npm_config_searchexclude":"","npm_config_searchlimit":"20","npm_config_searchopts":"","npm_config_searchstaleness":"900","npm_config_send_metrics":"","npm_config_shell":"C:\\Windows\\system32\\cmd.exe","npm_config_shrinkwrap":"true","npm_config_sign_git_commit":"","npm_config_sign_git_tag":"","npm_config_sso_poll_frequency":"500","npm_config_sso_type":"oauth","npm_config_strict_ssl":"true","npm_config_tag":"latest","npm_config_tag_version_prefix":"v","npm_config_timing":"","npm_config_tmp":"C:\\Users\\CAMERO~1\\AppData\\Local\\Temp","npm_config_umask":"0000","npm_config_unicode":"","npm_config_unsafe_perm":"true","npm_config_update_notifier":"true","npm_config_usage":"","npm_config_user":"","npm_config_userconfig":"C:\\Users\\Cameron Paczek\\.npmrc","npm_config_user_agent":"npm/6.14.15 node/v14.17.6 win32 x64","npm_config_version":"","npm_config_versions":"","npm_config_viewer":"browser","npm_execpath":"C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"dev","npm_lifecycle_script":"nuxt","npm_node_execpath":"C:\\Program Files\\nodejs\\node.exe","npm_package_dependencies_axios":"^0.23.0","npm_package_dependencies_core_js":"^3.15.1","npm_package_dependencies_nuxt":"^2.15.7","npm_package_dependencies__nuxtjs_dotenv":"^1.4.1","npm_package_dependencies__nuxtjs_eslint_module":"^3.0.2","npm_package_description":"```bash\r # install dependencies\r $ npm install","npm_package_devDependencies_eslint":"^7.29.0","npm_package_devDependencies_eslint_plugin_nuxt":"^2.0.0","npm_package_devDependencies_eslint_plugin_vue":"^7.12.1","npm_package_devDependencies__babel_eslint_parser":"^7.14.7","npm_package_devDependencies__nuxtjs_eslint_config":"^6.0.1","npm_package_name":"client","npm_package_private":"true","npm_package_readmeFilename":"README.md","npm_package_scripts_build":"nuxt build","npm_package_scripts_dev":"nuxt","npm_package_scripts_generate":"nuxt generate","npm_package_scripts_lint":"npm run lint:js","npm_package_scripts_lint_js":"eslint --ext \".js,.vue\" --ignore-path .gitignore .","npm_package_scripts_start":"nuxt start","npm_package_version":"1.0.0","NPM_PREFIX_NPM_CLI_JS":"C:\\Users\\Cameron Paczek\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","NUMBER_OF_PROCESSORS":"16","OculusBase":"C:\\Program Files\\Oculus\\","OneDrive":"C:\\Users\\Cameron Paczek\\OneDrive","OS":"Windows_NT","Path":"C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\npm-lifecycle\\node-gyp-bin;C:\\Users\\Cameron Paczek\\professor-team-3-1\\application\\client\\node_modules\\.bin;C:\\Users\\Cameron Paczek\\professor-team-3-1\\node_modules\\.bin;C:\\Program Files (x86)\\Razer Chroma SDK\\bin;C:\\Program Files\\Razer Chroma SDK\\bin;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files\\Oculus\\Support\\oculus-runtime;C:\\Program Files (x86)\\Common Files\\Intel\\Shared Libraries\\redist\\intel64\\compiler;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\Git\\cmd;C:\\Program Files\\PuTTY\\;C:\\ngrok;;C:\\Ruby26-x64\\bin;C:\\Users\\Cameron Paczek\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\Cameron Paczek\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\Cameron Paczek\\AppData\\Roaming\\npm;C:\\Users\\Cameron Paczek\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin;C:\\Users\\Cameron Paczek\\AppData\\Local\\gitkraken\\bin;C:\\Users\\Cameron Paczek\\AppData\\Local\\Programs\\MiKTeX\\miktex\\bin\\x64\\;C:\\Program Files\\010 Editor;C:\\Program Files\\Amazon\\AWSCLIV2\\;C:\\Program Files\\nodejs\\;C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\ProgramData\\DockerDesktop\\version-bin;C:\\Program Files\\dotnet\\;","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.RB;.RBW;.CPL","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 158 Stepping 12, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"9e0c","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Users\\Cameron Paczek\\Documents\\WindowsPowerShell\\Modules;C:\\Users\\Cameron Paczek\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\platform\\PowerShell;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","RUBYOPT":"-Eutf-8","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\Windows","TEMP":"C:\\Users\\CAMERO~1\\AppData\\Local\\Temp","TERMINAL_EMULATOR":"JetBrains-JediTerm","TERM_SESSION_ID":"5824d120-a069-460b-8f96-1b9ef89fc526","TMP":"C:\\Users\\CAMERO~1\\AppData\\Local\\Temp","TOOLBOX_VERSION":"1.21.9712","USERDOMAIN":"DESKTOP-TFJHU0M","USERDOMAIN_ROAMINGPROFILE":"DESKTOP-TFJHU0M","USERNAME":"Cameron Paczek","USERPROFILE":"C:\\Users\\Cameron Paczek","VUE_ENV":"server","windir":"C:\\Windows","_applied":"true","_prog":"node","__INTELLIJ_COMMAND_HISTFILE__":"C:\\Users\\Cameron Paczek\\AppData\\Local\\JetBrains\\WebStorm2021.2\\terminal\\history\\professor-team-3-1-history2"}
    }
    // Only set once

    if (context.req) {
      app.context.req = context.req
    }
    if (context.res) {
      app.context.res = context.res
    }

    if (context.ssrContext) {
      app.context.ssrContext = context.ssrContext
    }
    app.context.redirect = (status, path, query) => {
      if (!status) {
        return
      }
      app.context._redirected = true
      // if only 1 or 2 arguments: redirect('/') or redirect('/', { foo: 'bar' })
      let pathType = typeof path
      if (typeof status !== 'number' && (pathType === 'undefined' || pathType === 'object')) {
        query = path || {}
        path = status
        pathType = typeof path
        status = 302
      }
      if (pathType === 'object') {
        path = app.router.resolve(path).route.fullPath
      }
      // "/absolute/route", "./relative/route" or "../relative/route"
      if (/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)) {
        app.context.next({
          path,
          query,
          status
        })
      } else {
        path = withQuery(path, query)
        if (process.server) {
          app.context.next({
            path,
            status
          })
        }
        if (process.client) {
          // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
          window.location.replace(path)

          // Throw a redirect error
          throw new Error('ERR_REDIRECT')
        }
      }
    }
    if (process.server) {
      app.context.beforeNuxtRender = fn => context.beforeRenderFns.push(fn)
    }
    if (process.client) {
      app.context.nuxtState = window.__NUXT__
    }
  }

  // Dynamic keys
  const [currentRouteData, fromRouteData] = await Promise.all([
    getRouteData(context.route),
    getRouteData(context.from)
  ])

  if (context.route) {
    app.context.route = currentRouteData
  }

  if (context.from) {
    app.context.from = fromRouteData
  }

  app.context.next = context.next
  app.context._redirected = false
  app.context._errored = false
  app.context.isHMR = Boolean(context.isHMR)
  app.context.params = app.context.route.params || {}
  app.context.query = app.context.route.query || {}
}

export function middlewareSeries (promises, appContext) {
  if (!promises.length || appContext._redirected || appContext._errored) {
    return Promise.resolve()
  }
  return promisify(promises[0], appContext)
    .then(() => {
      return middlewareSeries(promises.slice(1), appContext)
    })
}

export function promisify (fn, context) {
  let promise
  if (fn.length === 2) {
      console.warn('Callback-based asyncData, fetch or middleware calls are deprecated. ' +
        'Please switch to promises or async/await syntax')

    // fn(context, callback)
    promise = new Promise((resolve) => {
      fn(context, function (err, data) {
        if (err) {
          context.error(err)
        }
        data = data || {}
        resolve(data)
      })
    })
  } else {
    promise = fn(context)
  }

  if (promise && promise instanceof Promise && typeof promise.then === 'function') {
    return promise
  }
  return Promise.resolve(promise)
}

// Imported from vue-router
export function getLocation (base, mode) {
  if (mode === 'hash') {
    return window.location.hash.replace(/^#\//, '')
  }

  base = decodeURI(base).slice(0, -1) // consideration is base is normalized with trailing slash
  let path = decodeURI(window.location.pathname)

  if (base && path.startsWith(base)) {
    path = path.slice(base.length)
  }

  const fullPath = (path || '/') + window.location.search + window.location.hash

  return normalizeURL(fullPath)
}

// Imported from path-to-regexp

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
export function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

export function getQueryDiff (toQuery, fromQuery) {
  const diff = {}
  const queries = { ...toQuery, ...fromQuery }
  for (const k in queries) {
    if (String(toQuery[k]) !== String(fromQuery[k])) {
      diff[k] = true
    }
  }
  return diff
}

export function normalizeError (err) {
  let message
  if (!(err.message || typeof err === 'string')) {
    try {
      message = JSON.stringify(err, null, 2)
    } catch (e) {
      message = `[${err.constructor.name}]`
    }
  } else {
    message = err.message || err
  }
  return {
    ...err,
    message,
    statusCode: (err.statusCode || err.status || (err.response && err.response.status) || 500)
  }
}

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
const PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  const tokens = []
  let key = 0
  let index = 0
  let path = ''
  const defaultDelimiter = (options && options.delimiter) || '/'
  let res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    const m = res[0]
    const escaped = res[1]
    const offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    const next = str[index]
    const prefix = res[2]
    const name = res[3]
    const capture = res[4]
    const group = res[5]
    const modifier = res[6]
    const asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    const partial = prefix != null && next != null && next !== prefix
    const repeat = modifier === '+' || modifier === '*'
    const optional = modifier === '?' || modifier === '*'
    const delimiter = res[2] || defaultDelimiter
    const pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter,
      optional,
      repeat,
      partial,
      asterisk: Boolean(asterisk),
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str, slashAllowed) {
  const re = slashAllowed ? /[?#]/g : /[/?#]/g
  return encodeURI(str).replace(re, (c) => {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURIComponentPretty(str, true)
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  const matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (let i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options))
    }
  }

  return function (obj, opts) {
    let path = ''
    const data = obj || {}
    const options = opts || {}
    const encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      const value = data[token.name || 'pathMatch']
      let segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (let j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

export function addLifecycleHook(vm, hook, fn) {
  if (!vm.$options[hook]) {
    vm.$options[hook] = []
  }
  if (!vm.$options[hook].includes(fn)) {
    vm.$options[hook].push(fn)
  }
}

export const urlJoin = joinURL

export const stripTrailingSlash = withoutTrailingSlash

export const isSamePath = _isSamePath

export function setScrollRestoration (newVal) {
  try {
    window.history.scrollRestoration = newVal;
  } catch(e) {}
}
