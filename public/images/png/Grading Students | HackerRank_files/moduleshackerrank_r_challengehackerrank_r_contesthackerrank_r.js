(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{"5wm+":function(e,t,r){"use strict";const a=(e,t)=>{const r=t-e+1;return Array.from({length:r},(t,r)=>e+r)};t.a=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],c=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;const i=Math.min(r,e),n=Math.max(e-r+1,r+1),s=a(1,i),p=a(n,e),m=t-l,d=e-r-2*l-1,x=t+l,u=r+2*l+2,h=Math.max(Math.min(m,d),i+2),g=Math.min(Math.max(x,u),p[0]-2),v=h>r+2,f=g<e-r-1,b=!v&&r+1<e-r,y=!f&&e-r>r,k=a(h,g),j=e>k.length,w=[...c?["prev"]:[],...j?s:[],...v?["ellipsis"]:[],...b?[r+1]:[],...k,...y?[e-r]:[],...f?["ellipsis"]:[],...j?p:[],...o?["next"]:[]];return w}},MdMq:function(e,t,r){"use strict";var a=r("pVnL"),o=r.n(a),c=r("QILm"),l=r.n(c),i=r("cDcd"),n=r.n(i),s=r("TSYQ"),p=r.n(s),m=r("ur9d"),d=r("37OS"),x=r.n(d);r("qK1I");const u=["page","count","onPageChange","type","liRef","renderElement","goToPage"];t.a=e=>{let t,r,a,c,i=e.page,s=e.count,d=e.onPageChange,h=e.type,g=e.liRef,v=e.renderElement,f=e.goToPage,b=l()(e,u),y=!1,k=0;"ellipsis"===h?(r="ellipsis",t="...",y=!0,a=!0,k=-1):"prev"===h?(t=n.a.createElement(m.a,{className:"pagination-left-icon"}),a=1===i,r=`Previous page (Page ${i-1})`):"next"===h?(t=n.a.createElement(m.a,null),a=i===s,r=`Next page (Page ${i+1})`):(t=h,c=h===i);const j=v||"button",w=d?()=>d(f):x.a;return n.a.createElement("li",{className:p()("pagination-item",{active:c,disabled:a,"no-hover":y}),ref:g},n.a.createElement(j,o()({tabIndex:k,className:"pagination-button",onClick:w,disabled:a,"aria-label":r},b),t))}},S1Ak:function(e,t,r){},SDNY:function(e,t,r){},foLx:function(e,t,r){"use strict";r("rGqo");var a=r("lSNA"),o=r.n(a),c=r("cDcd"),l=r.n(c),i=r("TSYQ"),n=r.n(i),s=r("eOGF");r("SDNY");function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}const d=["http://cdn.hrcdn.net/hackerrank/assets/gravatar.jpg","https://hrcdn.net/s3_pub/hr-avatars/dea116b8-45f8-4915-9995-9e9d853100fd/150x150.png"],x=e=>{const t=e.avatar,r=e.defaultAvatar,a=void 0!==t,o=r?t!==r:!d.includes(t);return a&&o?(e=>{const t=e.avatar,r=e.defaultAvatar,a=void 0===r?d[0]:r,o=e.size,c=e.avatarClass;return l.a.createElement("img",{src:t,height:o,width:o,className:n()("ui-avatar__img",c),onError:e=>{e.target.src!==a&&(e.target.src=a)}})})(e):(e=>{const t=e.name,r=e.size,a=e.avatarClass,o=e.customColor,c=e.customFontSize,i=e.customBg,p=o||Object(s.S)(t),d=Object(s.o)(t),x=c||Math.max(Math.round(r/3),10)+"px",u=i?{backgroundImage:`url(${i})`,backgroundSize:"cover"}:{backgroundColor:p};return l.a.createElement("span",{className:n()("ui-avatar__initials",a),style:m(m({},u),{},{width:r+"px",height:r+"px",fontSize:x})},l.a.createElement("span",{className:"ui-avatar__text absolute-center"},d))})(e)};x.defaultProps={size:25},t.a=x},mo6X:function(e,t,r){"use strict";r("rGqo");var a=r("w13Q");const o={cpp:"codemirror/mode/clike/clike",cpp14:"codemirror/mode/clike/clike",cpp20:"codemirror/mode/clike/clike",c:"codemirror/mode/clike/clike",java:"codemirror/mode/clike/clike",csharp:"codemirror/mode/clike/clike",scala:"codemirror/mode/clike/clike",sbcl:"codemirror/mode/commonlisp/commonlisp",ocaml:"codemirror/mode/mllike/mllike",fsharp:"codemirror/mode/mllike/mllike",visualbasic:"codemirror/mode/vb/vb",sql:"codemirror/mode/sql/sql",mysql:"codemirror/mode/sql/sql",tsql:"codemirror/mode/sql/sql",pgsql:"codemirror/mode/sql/sql",oracle:"codemirror/mode/sql/sql",html:["codemirror/mode/xml/xml","codemirror/mode/css/css","codemirror/mode/javascript/javascript","codemirror/mode/htmlmixed/htmlmixed"],php:["codemirror/mode/clike/clike","codemirror/mode/php/php"],python3:"codemirror/mode/python/python",java8:"codemirror/mode/clike/clike",java15:"codemirror/mode/clike/clike",kotlin:"codemirror/mode/clike/clike",db2:"codemirror/mode/sql/sql",bash:"codemirror/mode/shell/shell",objectivec:"codemirror/mode/clike/clike",lolcode:[],whitespace:[],text_pseudo:[],code:"codemirror/mode/clike/clike",text:[],racket:"codemirror/mode/scheme/scheme",coffeescript:"codemirror/mode/coffeescript/coffeescript",typescript:"codemirror/mode/javascript/javascript",elixir:"lib/codemirror_mode_elixir",pypy:"codemirror/mode/python/python",pypy3:"codemirror/mode/python/python",verilog:"codemirror/mode/verilog/verilog"},c=Object.freeze({c:"C",cpp:"C++",java:"Java 7",csharp:"C#",haskell:"Haskell",php:"PHP",python:"Python 2",ruby:"Ruby",perl:"Perl",bash:"BASH",clojure:"Clojure",scala:"Scala",code:"Generic",text:"Plain Text",brainfuck:"Brainfuck",javascript:"Javascript",typescript:"Typescript",lua:"Lua",sbcl:"Common Lisp (SBCL)",erlang:"Erlang",go:"Go",d:"D",ocaml:"OCaml",pascal:"Pascal",python3:"Python 3",groovy:"Groovy",objectivec:"Objective-C",text_pseudo:"Plain Text",fsharp:"F#",visualbasic:"VB.NET",lolcode:"LOLCODE",smalltalk:"Smalltalk",tcl:"Tcl",whitespace:"Whitespace",html:"HTML",css:"CSS",java8:"Java 8",java15:"Java 15",kotlin:"Kotlin",octave:"Octave",r:"R",xquery:"XQuery",racket:"Racket",cobol:"Cobol",xml:"XML",rust:"Rust",fortran:"Fortran",swift:"Swift",oracle:"Oracle",tsql:"MS SQL",db2:"DB2",mysql:"MySQL",sql:"SQL",ada:"ADA",cpp14:"C++14",cpp20:"C++20",coffeescript:"Coffeescript",elixir:"Elixir",pypy:"PyPy",pypy3:"PyPy3",julia:"Julia",verilog:"Verilog"}),l={c:"text/x-csrc",cpp:"text/x-c++src",java:"text/x-java",csharp:"text/x-csharp",haskell:"text/x-haskell",php:"text/x-php",python:"text/x-python",perl:"text/x-perl",ruby:"text/x-ruby",bash:"text/x-sh",clojure:"text/x-clojure",scala:"text/x-scala",code:"text/plain",text:"text/plain",brainfuck:"text/x-brainfuck",javascript:"text/javascript",typescript:"text/typescript",d:"text/x-d",go:"text/x-go",lua:"text/x-lua",erlang:"text/x-erlang",sbcl:"text/x-common-lisp",ocaml:"text/x-ocaml",pascal:"text/x-pascal",python3:"text/x-python",groovy:"text/x-groovy",text_pseudo:"text/plain",objectivec:"text/x-objectivec",fsharp:"text/x-fsharp",visualbasic:"text/x-vb",smalltalk:"text/x-stsrc",tcl:"text/x-tcl",html:"text/html",css:"text/css",java8:"text/x-java",java15:"text/x-java",kotlin:"text/x-kotlin",octave:"text/x-octave",r:"text/x-rsrc",xquery:"application/xquery",racket:"text/x-scheme",cobol:"text/x-cobol",xml:"text/xml",rust:"text/x-rustsrc",swift:"text/x-swift",oracle:"text/x-plsql",tsql:"text/x-plsql",db2:"text/x-plsql",mysql:"text/x-plsql",fortran:"text/x-fortran",sql:"text/x-plsql",ada:"text/ada",cpp14:"text/x-c++src",cpp20:"text/x-c++src",coffeescript:"text/x-coffeescript",elixir:"text/x-elixir",pypy:"text/x-python",pypy3:"text/x-python",julia:"text/x-julia",verilog:"text/x-verilog"};function i(e,t){let r=o[e]||`codemirror/mode/${e}/${e}`;return"string"==typeof r&&(r=[r]),r=r.map(e=>t(e+".js")),Object(a.c)(...r)}function n(e){const t={lang_head_template:{},lang_template:{},lang_tail_template:{},lang_head_offset:{},hasHiddenSkeletonPresent:!0};return e.languages.forEach(r=>{const a=r+"_template",o=r+"_skeliton_head",c=r+"_skeliton_tail",l=r+"_template_head",i=r+"_template_tail",n=!(!e[o]&&!e[c]);t.lang_head_template[r]=(e[o]||"").trimRight(),t.lang_tail_template[r]=e[c]||"",n&&(t.hasHiddenSkeletonPresent=!1),e[a]?t.lang_template[r]=e[a].trimRight():n&&(t.lang_template[r]=""),n||!e[l]&&!e[i]||(t.lang_template[r]=`${(e[l]||"").trimRight()}\n\n${(e[a]||"").trimRight()}\n\n${e[i]||""}`)}),e.show_skeliton?(t.showTemplate=!0,t.showNonEditableHeadTail=!0,t.hasHiddenSkeletonPresent=!0):(t.showTemplate=!1,t.showNonEditableHeadTail=!1),t}r.d(t,"d",(function(){return i})),r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return c})),r.d(t,"c",(function(){return l}))},qK1I:function(e,t,r){},ur9d:function(e,t,r){"use strict";var a=r("pVnL"),o=r.n(a),c=r("MVZn"),l=r.n(c),i=r("QILm"),n=r.n(i),s=r("cDcd"),p=r.n(s);r("Jkfs");t.a=e=>{let t=e.className,r=void 0===t?"":t,a=n()(e,["className"]);return a=l()({},a,{className:r+" ui-svg-icon"}),p.a.createElement("svg",o()({viewBox:"0 0 491.87 871.25",width:"1em",height:"1em"},a,{fill:"currentColor"}),p.a.createElement("path",{d:"M28.43 843.439L.617 815.628l189.687-189.69 189.687-189.69-189.996-190L0 56.25l28.125-28.125L56.25 0l217.81 217.813 217.81 217.813-217.815 217.812L56.24 871.25l-27.81-27.811z"}))}},"xxD/":function(e,t,r){"use strict";var a=r("J4zp"),o=r.n(a),c=(r("a1Th"),r("cDcd")),l=r.n(c),i=r("5wm+"),n=r("MdMq"),s=r("TSYQ"),p=r.n(s);r("S1Ak");const m=(e,t)=>"ellipsis"===e?e+t:e.toString();t.a=e=>{let t=e.count,r=e.page,a=e.onPageChange,s=e.showNextButton,d=void 0===s||s,x=e.showPrevButton,u=void 0===x||x,h=e.siblingCount,g=void 0===h?1:h,v=e.boundaryCount,f=void 0===v?1:v,b=e.renderItem;const y=Object(i.a)(t,r,f,d,u,g),k=Object(c.useRef)(null),j=y.indexOf(r),w=Object(c.useState)(36),q=o()(w,2),O=q[0],_=q[1],P=Object(c.useState)(!1),S=o()(P,2),E=S[0],C=S[1],L=Object(c.useRef)(!1);return Object(c.useEffect)(()=>{const e=()=>{C(!1);const e=k.current;e&&_(e.getBoundingClientRect().width),C(!0)};return e(),L.current=!0,window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),l.a.createElement("nav",{className:"pagination-wrapper"},L.current&&l.a.createElement("span",{className:p()("pagination-underline",{"no-transition":!E}),style:{transform:`translateX(${j*(O+6)+3}px)`,width:O+"px"}}),l.a.createElement("ul",{className:"pagination-list"},y.map((e,o)=>{let c=Number(e);"next"===e?c=r+1:"prev"===e&&(c=r-1);const i={type:e,page:r,count:t,onPageChange:a,liRef:k,goToPage:c};return l.a.createElement(l.a.Fragment,{key:m(e,o)},b?b(i,o):l.a.createElement(n.a,i))})))}}}]);
//# sourceMappingURL=https://hrcdn.net/community-frontend/assets/sourcemaps/modules~hackerrank_r_challenge~hackerrank_r_contest~hackerrank_r_leaderboard~hackerrank_r_leaderboardv2-e9ea379a.js.map