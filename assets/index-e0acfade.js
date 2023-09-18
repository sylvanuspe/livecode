import{E as B,m as I,k as y,b as m,n as K,P as me,B as ge,F as be,c as Le,a as J,G as Be,H as De,V as ke,l as Q,S as C,M as X,I as Fe,J as ne,o as xe,e as je,A as Ue,D as $,W as We,i as $e}from"./editor-9df48419.js";import{s as N,a as Ne}from"./index-b234d5eb.js";class ye{constructor(e,t,n){this.state=e,this.pos=t,this.explicit=n,this.abortListeners=[]}tokenBefore(e){let t=N(this.state).resolveInner(this.pos,-1);for(;t&&e.indexOf(t.name)<0;)t=t.parent;return t?{from:t.from,to:this.pos,text:this.state.sliceDoc(t.from,this.pos),type:t.type}:null}matchBefore(e){let t=this.state.doc.lineAt(this.pos),n=Math.max(t.from,this.pos-250),s=t.text.slice(n-t.from,this.pos-t.from),o=s.search(we(e,!1));return o<0?null:{from:n+o,to:this.pos,text:s.slice(o)}}get aborted(){return this.abortListeners==null}addEventListener(e,t){e=="abort"&&this.abortListeners&&this.abortListeners.push(t)}}function se(i){let e=Object.keys(i).join(""),t=/\w/.test(e);return t&&(e=e.replace(/\w/g,"")),`[${t?"\\w":""}${e.replace(/[^\w\s]/g,"\\$&")}]`}function Ve(i){let e=Object.create(null),t=Object.create(null);for(let{label:s}of i){e[s[0]]=!0;for(let o=1;o<s.length;o++)t[s[o]]=!0}let n=se(e)+se(t)+"*$";return[new RegExp("^"+n),new RegExp(n)]}function ze(i){let e=i.map(s=>typeof s=="string"?{label:s}:s),[t,n]=e.every(s=>/^\w+$/.test(s.label))?[/\w*$/,/\w+$/]:Ve(e);return s=>{let o=s.matchBefore(n);return o||s.explicit?{from:o?o.from:s.pos,options:e,validFor:t}:null}}function Bt(i,e){return t=>{for(let n=N(t.state).resolveInner(t.pos,-1);n;n=n.parent){if(i.indexOf(n.name)>-1)return null;if(n.type.isTop)break}return e(t)}}class oe{constructor(e,t,n){this.completion=e,this.source=t,this.match=n}}function P(i){return i.selection.main.head}function we(i,e){var t;let{source:n}=i,s=e&&n[0]!="^",o=n[n.length-1]!="$";return!s&&!o?i:new RegExp(`${s?"^":""}(?:${n})${o?"$":""}`,(t=i.flags)!==null&&t!==void 0?t:i.ignoreCase?"i":"")}const ve=Ue.define();function He(i,e,t,n){return Object.assign(Object.assign({},i.changeByRange(s=>{if(s==i.selection.main)return{changes:{from:t,to:n,insert:e},range:m.cursor(t+e.length)};let o=n-t;return!s.empty||o&&i.sliceDoc(s.from-o,s.from)!=i.sliceDoc(t,n)?{range:s}:{changes:{from:s.from-o,to:s.from,insert:e},range:m.cursor(s.from-o+e.length)}})),{userEvent:"input.complete"})}function Ce(i,e){const t=e.completion.apply||e.completion.label;let n=e.source;typeof t=="string"?i.dispatch(Object.assign(Object.assign({},He(i.state,t,n.from,n.to)),{annotations:ve.of(e.completion)})):t(i,e.completion,n.from,n.to)}const le=new WeakMap;function qe(i){if(!Array.isArray(i))return i;let e=le.get(i);return e||le.set(i,e=ze(i)),e}class Ke{constructor(e){this.pattern=e,this.chars=[],this.folded=[],this.any=[],this.precise=[],this.byWord=[];for(let t=0;t<e.length;){let n=y(e,t),s=I(n);this.chars.push(n);let o=e.slice(t,t+s),l=o.toUpperCase();this.folded.push(y(l==o?o.toLowerCase():l,0)),t+=s}this.astral=e.length!=this.chars.length}match(e){if(this.pattern.length==0)return[0];if(e.length<this.pattern.length)return null;let{chars:t,folded:n,any:s,precise:o,byWord:l}=this;if(t.length==1){let u=y(e,0),A=I(u),v=A==e.length?0:-100;if(u!=t[0])if(u==n[0])v+=-200;else return null;return[v,0,A]}let r=e.indexOf(this.pattern);if(r==0)return[e.length==this.pattern.length?0:-100,0,this.pattern.length];let a=t.length,c=0;if(r<0){for(let u=0,A=Math.min(e.length,200);u<A&&c<a;){let v=y(e,u);(v==t[c]||v==n[c])&&(s[c++]=u),u+=I(v)}if(c<a)return null}let f=0,h=0,S=!1,g=0,w=-1,k=-1,Me=/[a-z]/.test(e),z=!0;for(let u=0,A=Math.min(e.length,200),v=0;u<A&&h<a;){let p=y(e,u);r<0&&(f<a&&p==t[f]&&(o[f++]=u),g<a&&(p==t[g]||p==n[g]?(g==0&&(w=u),k=u+1,g++):g=0));let F,H=p<255?p>=48&&p<=57||p>=97&&p<=122?2:p>=65&&p<=90?1:0:(F=xe(p))!=F.toLowerCase()?1:F!=F.toUpperCase()?2:0;(!u||H==1&&Me||v==0&&H!=0)&&(t[h]==p||n[h]==p&&(S=!0)?l[h++]=u:l.length&&(z=!1)),v=H,u+=I(p)}return h==a&&l[0]==0&&z?this.result(-100+(S?-200:0),l,e):g==a&&w==0?[-200-e.length+(k==e.length?0:-100),0,k]:r>-1?[-700-e.length,r,r+this.pattern.length]:g==a?[-200+-700-e.length,w,k]:h==a?this.result(-100+(S?-200:0)+-700+(z?0:-1100),l,e):t.length==2?null:this.result((s[0]?-700:0)+-200+-1100,s,e)}result(e,t,n){let s=[e-n.length],o=1;for(let l of t){let r=l+(this.astral?I(y(n,l)):1);o>1&&s[o-1]==l?s[o-1]=r:(s[o++]=l,s[o++]=r)}return s}}const x=be.define({combine(i){return Le(i,{activateOnTyping:!0,selectOnOpen:!0,override:null,closeOnBlur:!0,maxRenderedOptions:100,defaultKeymap:!0,tooltipClass:()=>"",optionClass:()=>"",aboveCursor:!1,icons:!0,addToOptions:[],compareCompletions:(e,t)=>e.label.localeCompare(t.label),interactionDelay:75},{defaultKeymap:(e,t)=>e&&t,closeOnBlur:(e,t)=>e&&t,icons:(e,t)=>e&&t,tooltipClass:(e,t)=>n=>re(e(n),t(n)),optionClass:(e,t)=>n=>re(e(n),t(n)),addToOptions:(e,t)=>e.concat(t)})}});function re(i,e){return i?e?i+" "+e:i:e}function Qe(i){let e=i.addToOptions.slice();return i.icons&&e.push({render(t){let n=document.createElement("div");return n.classList.add("cm-completionIcon"),t.type&&n.classList.add(...t.type.split(/\s+/g).map(s=>"cm-completionIcon-"+s)),n.setAttribute("aria-hidden","true"),n},position:20}),e.push({render(t,n,s){let o=document.createElement("span");o.className="cm-completionLabel";let{label:l}=t,r=0;for(let a=1;a<s.length;){let c=s[a++],f=s[a++];c>r&&o.appendChild(document.createTextNode(l.slice(r,c)));let h=o.appendChild(document.createElement("span"));h.appendChild(document.createTextNode(l.slice(c,f))),h.className="cm-completionMatchedText",r=f}return r<l.length&&o.appendChild(document.createTextNode(l.slice(r))),o},position:50},{render(t){if(!t.detail)return null;let n=document.createElement("span");return n.className="cm-completionDetail",n.textContent=t.detail,n},position:80}),e.sort((t,n)=>t.position-n.position).map(t=>t.render)}function ae(i,e,t){if(i<=t)return{from:0,to:i};if(e<0&&(e=0),e<=i>>1){let s=Math.floor(e/t);return{from:s*t,to:(s+1)*t}}let n=Math.floor((i-e)/t);return{from:i-(n+1)*t,to:i-n*t}}class Xe{constructor(e,t){this.view=e,this.stateField=t,this.info=null,this.placeInfo={read:()=>this.measureInfo(),write:r=>this.positionInfo(r),key:this},this.space=null,this.currentClass="";let n=e.state.field(t),{options:s,selected:o}=n.open,l=e.state.facet(x);this.optionContent=Qe(l),this.optionClass=l.optionClass,this.tooltipClass=l.tooltipClass,this.range=ae(s.length,o,l.maxRenderedOptions),this.dom=document.createElement("div"),this.dom.className="cm-tooltip-autocomplete",this.updateTooltipClass(e.state),this.dom.addEventListener("mousedown",r=>{for(let a=r.target,c;a&&a!=this.dom;a=a.parentNode)if(a.nodeName=="LI"&&(c=/-(\d+)$/.exec(a.id))&&+c[1]<s.length){Ce(e,s[+c[1]]),r.preventDefault();return}}),this.list=this.dom.appendChild(this.createListBox(s,n.id,this.range)),this.list.addEventListener("scroll",()=>{this.info&&this.view.requestMeasure(this.placeInfo)})}mount(){this.updateSel()}update(e){var t,n,s;let o=e.state.field(this.stateField),l=e.startState.field(this.stateField);this.updateTooltipClass(e.state),o!=l&&(this.updateSel(),((t=o.open)===null||t===void 0?void 0:t.disabled)!=((n=l.open)===null||n===void 0?void 0:n.disabled)&&this.dom.classList.toggle("cm-tooltip-autocomplete-disabled",!!(!((s=o.open)===null||s===void 0)&&s.disabled)))}updateTooltipClass(e){let t=this.tooltipClass(e);if(t!=this.currentClass){for(let n of this.currentClass.split(" "))n&&this.dom.classList.remove(n);for(let n of t.split(" "))n&&this.dom.classList.add(n);this.currentClass=t}}positioned(e){this.space=e,this.info&&this.view.requestMeasure(this.placeInfo)}updateSel(){let e=this.view.state.field(this.stateField),t=e.open;if((t.selected>-1&&t.selected<this.range.from||t.selected>=this.range.to)&&(this.range=ae(t.options.length,t.selected,this.view.state.facet(x).maxRenderedOptions),this.list.remove(),this.list=this.dom.appendChild(this.createListBox(t.options,e.id,this.range)),this.list.addEventListener("scroll",()=>{this.info&&this.view.requestMeasure(this.placeInfo)})),this.updateSelectedOption(t.selected)){this.info&&(this.info.remove(),this.info=null);let{completion:n}=t.options[t.selected],{info:s}=n;if(!s)return;let o=typeof s=="string"?document.createTextNode(s):s(n);if(!o)return;"then"in o?o.then(l=>{l&&this.view.state.field(this.stateField,!1)==e&&this.addInfoPane(l)}).catch(l=>Q(this.view.state,l,"completion info")):this.addInfoPane(o)}}addInfoPane(e){let t=this.info=document.createElement("div");t.className="cm-tooltip cm-completionInfo",t.appendChild(e),this.dom.appendChild(t),this.view.requestMeasure(this.placeInfo)}updateSelectedOption(e){let t=null;for(let n=this.list.firstChild,s=this.range.from;n;n=n.nextSibling,s++)s==e?n.hasAttribute("aria-selected")||(n.setAttribute("aria-selected","true"),t=n):n.hasAttribute("aria-selected")&&n.removeAttribute("aria-selected");return t&&Je(this.list,t),t}measureInfo(){let e=this.dom.querySelector("[aria-selected]");if(!e||!this.info)return null;let t=this.dom.getBoundingClientRect(),n=this.info.getBoundingClientRect(),s=e.getBoundingClientRect(),o=this.space;if(!o){let w=this.dom.ownerDocument.defaultView||window;o={left:0,top:0,right:w.innerWidth,bottom:w.innerHeight}}if(s.top>Math.min(o.bottom,t.bottom)-10||s.bottom<Math.max(o.top,t.top)+10)return null;let l=this.view.textDirection==$e.RTL,r=l,a=!1,c,f="",h="",S=t.left-o.left,g=o.right-t.right;if(r&&S<Math.min(n.width,g)?r=!1:!r&&g<Math.min(n.width,S)&&(r=!0),n.width<=(r?S:g))f=Math.max(o.top,Math.min(s.top,o.bottom-n.height))-t.top+"px",c=Math.min(400,r?S:g)+"px";else{a=!0,c=Math.min(400,(l?t.right:o.right-t.left)-30)+"px";let w=o.bottom-t.bottom;w>=n.height||w>t.top?f=s.bottom-t.top+"px":h=t.bottom-s.top+"px"}return{top:f,bottom:h,maxWidth:c,class:a?l?"left-narrow":"right-narrow":r?"left":"right"}}positionInfo(e){this.info&&(e?(this.info.style.top=e.top,this.info.style.bottom=e.bottom,this.info.style.maxWidth=e.maxWidth,this.info.className="cm-tooltip cm-completionInfo cm-completionInfo-"+e.class):this.info.style.top="-1e6px")}createListBox(e,t,n){const s=document.createElement("ul");s.id=t,s.setAttribute("role","listbox"),s.setAttribute("aria-expanded","true"),s.setAttribute("aria-label",this.view.state.phrase("Completions"));for(let o=n.from;o<n.to;o++){let{completion:l,match:r}=e[o];const a=s.appendChild(document.createElement("li"));a.id=t+"-"+o,a.setAttribute("role","option");let c=this.optionClass(l);c&&(a.className=c);for(let f of this.optionContent){let h=f(l,this.view.state,r);h&&a.appendChild(h)}}return n.from&&s.classList.add("cm-completionListIncompleteTop"),n.to<e.length&&s.classList.add("cm-completionListIncompleteBottom"),s}}function Ge(i){return e=>new Xe(e,i)}function Je(i,e){let t=i.getBoundingClientRect(),n=e.getBoundingClientRect();n.top<t.top?i.scrollTop-=t.top-n.top:n.bottom>t.bottom&&(i.scrollTop+=n.bottom-t.bottom)}function ce(i){return(i.boost||0)*100+(i.apply?10:0)+(i.info?5:0)+(i.type?1:0)}function Ye(i,e){let t=[],n=0;for(let r of i)if(r.hasResult())if(r.result.filter===!1){let a=r.result.getMatch;for(let c of r.result.options){let f=[1e9-n++];if(a)for(let h of a(c))f.push(h);t.push(new oe(c,r,f))}}else{let a=new Ke(e.sliceDoc(r.from,r.to)),c;for(let f of r.result.options)(c=a.match(f.label))&&(f.boost!=null&&(c[0]+=f.boost),t.push(new oe(f,r,c)))}let s=[],o=null,l=e.facet(x).compareCompletions;for(let r of t.sort((a,c)=>c.match[0]-a.match[0]||l(a.completion,c.completion)))!o||o.label!=r.completion.label||o.detail!=r.completion.detail||o.type!=null&&r.completion.type!=null&&o.type!=r.completion.type||o.apply!=r.completion.apply?s.push(r):ce(r.completion)>ce(o)&&(s[s.length-1]=r),o=r.completion;return s}class O{constructor(e,t,n,s,o,l){this.options=e,this.attrs=t,this.tooltip=n,this.timestamp=s,this.selected=o,this.disabled=l}setSelected(e,t){return e==this.selected||e>=this.options.length?this:new O(this.options,fe(t,e),this.tooltip,this.timestamp,e,this.disabled)}static build(e,t,n,s,o){let l=Ye(e,t);if(!l.length)return s&&e.some(a=>a.state==1)?new O(s.options,s.attrs,s.tooltip,s.timestamp,s.selected,!0):null;let r=t.facet(x).selectOnOpen?0:-1;if(s&&s.selected!=r&&s.selected!=-1){let a=s.options[s.selected].completion;for(let c=0;c<l.length;c++)if(l[c].completion==a){r=c;break}}return new O(l,fe(n,r),{pos:e.reduce((a,c)=>c.hasResult()?Math.min(a,c.from):a,1e8),create:Ge(b),above:o.aboveCursor},s?s.timestamp:Date.now(),r,!1)}map(e){return new O(this.options,this.attrs,Object.assign(Object.assign({},this.tooltip),{pos:e.mapPos(this.tooltip.pos)}),this.timestamp,this.selected,this.disabled)}}class U{constructor(e,t,n){this.active=e,this.id=t,this.open=n}static start(){return new U(et,"cm-ac-"+Math.floor(Math.random()*2e6).toString(36),null)}update(e){let{state:t}=e,n=t.facet(x),o=(n.override||t.languageDataAt("autocomplete",P(t)).map(qe)).map(r=>(this.active.find(c=>c.source==r)||new d(r,this.active.some(c=>c.state!=0)?1:0)).update(e,n));o.length==this.active.length&&o.every((r,a)=>r==this.active[a])&&(o=this.active);let l=this.open;l&&e.docChanged&&(l=l.map(e.changes)),e.selection||o.some(r=>r.hasResult()&&e.changes.touchesRange(r.from,r.to))||!Ze(o,this.active)?l=O.build(o,t,this.id,l,n):l&&l.disabled&&!o.some(r=>r.state==1)&&(l=null),!l&&o.every(r=>r.state!=1)&&o.some(r=>r.hasResult())&&(o=o.map(r=>r.hasResult()?new d(r.source,0):r));for(let r of e.effects)r.is(Ie)&&(l=l&&l.setSelected(r.value,this.id));return o==this.active&&l==this.open?this:new U(o,this.id,l)}get tooltip(){return this.open?this.open.tooltip:null}get attrs(){return this.open?this.open.attrs:_e}}function Ze(i,e){if(i==e)return!0;for(let t=0,n=0;;){for(;t<i.length&&!i[t].hasResult;)t++;for(;n<e.length&&!e[n].hasResult;)n++;let s=t==i.length,o=n==e.length;if(s||o)return s==o;if(i[t++].result!=e[n++].result)return!1}}const _e={"aria-autocomplete":"list"};function fe(i,e){let t={"aria-autocomplete":"list","aria-haspopup":"listbox","aria-controls":i};return e>-1&&(t["aria-activedescendant"]=i+"-"+e),t}const et=[];function G(i){return i.isUserEvent("input.type")?"input":i.isUserEvent("delete.backward")?"delete":null}class d{constructor(e,t,n=-1){this.source=e,this.state=t,this.explicitPos=n}hasResult(){return!1}update(e,t){let n=G(e),s=this;n?s=s.handleUserEvent(e,n,t):e.docChanged?s=s.handleChange(e):e.selection&&s.state!=0&&(s=new d(s.source,0));for(let o of e.effects)if(o.is(Y))s=new d(s.source,1,o.value?P(e.state):-1);else if(o.is(W))s=new d(s.source,0);else if(o.is(Se))for(let l of o.value)l.source==s.source&&(s=l);return s}handleUserEvent(e,t,n){return t=="delete"||!n.activateOnTyping?this.map(e.changes):new d(this.source,1)}handleChange(e){return e.changes.touchesRange(P(e.startState))?new d(this.source,0):this.map(e.changes)}map(e){return e.empty||this.explicitPos<0?this:new d(this.source,this.state,e.mapPos(this.explicitPos))}}class R extends d{constructor(e,t,n,s,o){super(e,2,t),this.result=n,this.from=s,this.to=o}hasResult(){return!0}handleUserEvent(e,t,n){var s;let o=e.changes.mapPos(this.from),l=e.changes.mapPos(this.to,1),r=P(e.state);if((this.explicitPos<0?r<=o:r<this.from)||r>l||t=="delete"&&P(e.startState)==this.from)return new d(this.source,t=="input"&&n.activateOnTyping?1:0);let a=this.explicitPos<0?-1:e.changes.mapPos(this.explicitPos),c;return tt(this.result.validFor,e.state,o,l)?new R(this.source,a,this.result,o,l):this.result.update&&(c=this.result.update(this.result,o,l,new ye(e.state,r,a>=0)))?new R(this.source,a,c,c.from,(s=c.to)!==null&&s!==void 0?s:P(e.state)):new d(this.source,1,a)}handleChange(e){return e.changes.touchesRange(this.from,this.to)?new d(this.source,0):this.map(e.changes)}map(e){return e.empty?this:new R(this.source,this.explicitPos<0?-1:e.mapPos(this.explicitPos),this.result,e.mapPos(this.from),e.mapPos(this.to,1))}}function tt(i,e,t,n){if(!i)return!1;let s=e.sliceDoc(t,n);return typeof i=="function"?i(s,t,n,e):we(i,!0).test(s)}const Y=C.define(),W=C.define(),Se=C.define({map(i,e){return i.map(t=>t.map(e))}}),Ie=C.define(),b=J.define({create(){return U.start()},update(i,e){return i.update(e)},provide:i=>[Be.from(i,e=>e.tooltip),B.contentAttributes.from(i,e=>e.attrs)]});function j(i,e="option"){return t=>{let n=t.state.field(b,!1);if(!n||!n.open||n.open.disabled||Date.now()-n.open.timestamp<t.state.facet(x).interactionDelay)return!1;let s=1,o;e=="page"&&(o=De(t,n.open.tooltip))&&(s=Math.max(2,Math.floor(o.dom.offsetHeight/o.dom.querySelector("li").offsetHeight)-1));let{length:l}=n.open.options,r=n.open.selected>-1?n.open.selected+s*(i?1:-1):i?0:l-1;return r<0?r=e=="page"?0:l-1:r>=l&&(r=e=="page"?l-1:0),t.dispatch({effects:Ie.of(r)}),!0}}const it=i=>{let e=i.state.field(b,!1);return i.state.readOnly||!e||!e.open||e.open.selected<0||Date.now()-e.open.timestamp<i.state.facet(x).interactionDelay?!1:(e.open.disabled||Ce(i,e.open.options[e.open.selected]),!0)},nt=i=>i.state.field(b,!1)?(i.dispatch({effects:Y.of(!0)}),!0):!1,st=i=>{let e=i.state.field(b,!1);return!e||!e.active.some(t=>t.state!=0)?!1:(i.dispatch({effects:W.of(null)}),!0)};class ot{constructor(e,t){this.active=e,this.context=t,this.time=Date.now(),this.updates=[],this.done=void 0}}const he=50,lt=50,rt=1e3,at=ke.fromClass(class{constructor(i){this.view=i,this.debounceUpdate=-1,this.running=[],this.debounceAccept=-1,this.composing=0;for(let e of i.state.field(b).active)e.state==1&&this.startQuery(e)}update(i){let e=i.state.field(b);if(!i.selectionSet&&!i.docChanged&&i.startState.field(b)==e)return;let t=i.transactions.some(n=>(n.selection||n.docChanged)&&!G(n));for(let n=0;n<this.running.length;n++){let s=this.running[n];if(t||s.updates.length+i.transactions.length>lt&&Date.now()-s.time>rt){for(let o of s.context.abortListeners)try{o()}catch(l){Q(this.view.state,l)}s.context.abortListeners=null,this.running.splice(n--,1)}else s.updates.push(...i.transactions)}if(this.debounceUpdate>-1&&clearTimeout(this.debounceUpdate),this.debounceUpdate=e.active.some(n=>n.state==1&&!this.running.some(s=>s.active.source==n.source))?setTimeout(()=>this.startUpdate(),he):-1,this.composing!=0)for(let n of i.transactions)G(n)=="input"?this.composing=2:this.composing==2&&n.selection&&(this.composing=3)}startUpdate(){this.debounceUpdate=-1;let{state:i}=this.view,e=i.field(b);for(let t of e.active)t.state==1&&!this.running.some(n=>n.active.source==t.source)&&this.startQuery(t)}startQuery(i){let{state:e}=this.view,t=P(e),n=new ye(e,t,i.explicitPos==t),s=new ot(i,n);this.running.push(s),Promise.resolve(i.source(n)).then(o=>{s.context.aborted||(s.done=o||null,this.scheduleAccept())},o=>{this.view.dispatch({effects:W.of(null)}),Q(this.view.state,o)})}scheduleAccept(){this.running.every(i=>i.done!==void 0)?this.accept():this.debounceAccept<0&&(this.debounceAccept=setTimeout(()=>this.accept(),he))}accept(){var i;this.debounceAccept>-1&&clearTimeout(this.debounceAccept),this.debounceAccept=-1;let e=[],t=this.view.state.facet(x);for(let n=0;n<this.running.length;n++){let s=this.running[n];if(s.done===void 0)continue;if(this.running.splice(n--,1),s.done){let l=new R(s.active.source,s.active.explicitPos,s.done,s.done.from,(i=s.done.to)!==null&&i!==void 0?i:P(s.updates.length?s.updates[0].startState:this.view.state));for(let r of s.updates)l=l.update(r,t);if(l.hasResult()){e.push(l);continue}}let o=this.view.state.field(b).active.find(l=>l.source==s.active.source);if(o&&o.state==1)if(s.done==null){let l=new d(s.active.source,0);for(let r of s.updates)l=l.update(r,t);l.state!=1&&e.push(l)}else this.startQuery(o)}e.length&&this.view.dispatch({effects:Se.of(e)})}},{eventHandlers:{blur(){let i=this.view.state.field(b,!1);i&&i.tooltip&&this.view.state.facet(x).closeOnBlur&&this.view.dispatch({effects:W.of(null)})},compositionstart(){this.composing=1},compositionend(){this.composing==3&&setTimeout(()=>this.view.dispatch({effects:Y.of(!1)}),20),this.composing=0}}}),Pe=B.baseTheme({".cm-tooltip.cm-tooltip-autocomplete":{"& > ul":{fontFamily:"monospace",whiteSpace:"nowrap",overflow:"hidden auto",maxWidth_fallback:"700px",maxWidth:"min(700px, 95vw)",minWidth:"250px",maxHeight:"10em",height:"100%",listStyle:"none",margin:0,padding:0,"& > li":{overflowX:"hidden",textOverflow:"ellipsis",cursor:"pointer",padding:"1px 3px",lineHeight:1.2}}},"&light .cm-tooltip-autocomplete ul li[aria-selected]":{background:"#17c",color:"white"},"&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]":{background:"#777"},"&dark .cm-tooltip-autocomplete ul li[aria-selected]":{background:"#347",color:"white"},"&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]":{background:"#444"},".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after":{content:'"···"',opacity:.5,display:"block",textAlign:"center"},".cm-tooltip.cm-completionInfo":{position:"absolute",padding:"3px 9px",width:"max-content",maxWidth:"400px",boxSizing:"border-box"},".cm-completionInfo.cm-completionInfo-left":{right:"100%"},".cm-completionInfo.cm-completionInfo-right":{left:"100%"},".cm-completionInfo.cm-completionInfo-left-narrow":{right:"30px"},".cm-completionInfo.cm-completionInfo-right-narrow":{left:"30px"},"&light .cm-snippetField":{backgroundColor:"#00000022"},"&dark .cm-snippetField":{backgroundColor:"#ffffff22"},".cm-snippetFieldPosition":{verticalAlign:"text-top",width:0,height:"1.15em",display:"inline-block",margin:"0 -0.7px -.7em",borderLeft:"1.4px dotted #888"},".cm-completionMatchedText":{textDecoration:"underline"},".cm-completionDetail":{marginLeft:"0.5em",fontStyle:"italic"},".cm-completionIcon":{fontSize:"90%",width:".8em",display:"inline-block",textAlign:"center",paddingRight:".6em",opacity:"0.6",boxSizing:"content-box"},".cm-completionIcon-function, .cm-completionIcon-method":{"&:after":{content:"'ƒ'"}},".cm-completionIcon-class":{"&:after":{content:"'○'"}},".cm-completionIcon-interface":{"&:after":{content:"'◌'"}},".cm-completionIcon-variable":{"&:after":{content:"'𝑥'"}},".cm-completionIcon-constant":{"&:after":{content:"'𝐶'"}},".cm-completionIcon-type":{"&:after":{content:"'𝑡'"}},".cm-completionIcon-enum":{"&:after":{content:"'∪'"}},".cm-completionIcon-property":{"&:after":{content:"'□'"}},".cm-completionIcon-keyword":{"&:after":{content:"'🔑︎'"}},".cm-completionIcon-namespace":{"&:after":{content:"'▢'"}},".cm-completionIcon-text":{"&:after":{content:"'abc'",fontSize:"50%",verticalAlign:"middle"}}});class ct{constructor(e,t,n,s){this.field=e,this.line=t,this.from=n,this.to=s}}class Z{constructor(e,t,n){this.field=e,this.from=t,this.to=n}map(e){let t=e.mapPos(this.from,-1,X.TrackDel),n=e.mapPos(this.to,1,X.TrackDel);return t==null||n==null?null:new Z(this.field,t,n)}}class _{constructor(e,t){this.lines=e,this.fieldPositions=t}instantiate(e,t){let n=[],s=[t],o=e.doc.lineAt(t),l=/^\s*/.exec(o.text)[0];for(let a of this.lines){if(n.length){let c=l,f=/^\t*/.exec(a)[0].length;for(let h=0;h<f;h++)c+=e.facet(Ne);s.push(t+c.length-f),a=c+a.slice(f)}n.push(a),t+=a.length+1}let r=this.fieldPositions.map(a=>new Z(a.field,s[a.line]+a.from,s[a.line]+a.to));return{text:n,ranges:r}}static parse(e){let t=[],n=[],s=[],o;for(let l of e.split(/\r\n?|\n/)){for(;o=/[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(l);){let r=o[1]?+o[1]:null,a=o[2]||o[3]||"",c=-1;for(let f=0;f<t.length;f++)(r!=null?t[f].seq==r:a&&t[f].name==a)&&(c=f);if(c<0){let f=0;for(;f<t.length&&(r==null||t[f].seq!=null&&t[f].seq<r);)f++;t.splice(f,0,{seq:r,name:a}),c=f;for(let h of s)h.field>=c&&h.field++}s.push(new ct(c,n.length,o.index,o.index+a.length)),l=l.slice(0,o.index)+a+l.slice(o.index+o[0].length)}for(let r;r=/\\([{}])/.exec(l);){l=l.slice(0,r.index)+r[1]+l.slice(r.index+r[0].length);for(let a of s)a.line==n.length&&a.from>r.index&&(a.from--,a.to--)}n.push(l)}return new _(n,s)}}let ft=$.widget({widget:new class extends We{toDOM(){let i=document.createElement("span");return i.className="cm-snippetFieldPosition",i}ignoreEvent(){return!1}}}),ht=$.mark({class:"cm-snippetField"});class T{constructor(e,t){this.ranges=e,this.active=t,this.deco=$.set(e.map(n=>(n.from==n.to?ft:ht).range(n.from,n.to)))}map(e){let t=[];for(let n of this.ranges){let s=n.map(e);if(!s)return null;t.push(s)}return new T(t,this.active)}selectionInsideField(e){return e.ranges.every(t=>this.ranges.some(n=>n.field==this.active&&n.from<=t.from&&n.to>=t.to))}}const D=C.define({map(i,e){return i&&i.map(e)}}),ut=C.define(),M=J.define({create(){return null},update(i,e){for(let t of e.effects){if(t.is(D))return t.value;if(t.is(ut)&&i)return new T(i.ranges,t.value)}return i&&e.docChanged&&(i=i.map(e.changes)),i&&e.selection&&!i.selectionInsideField(e.selection)&&(i=null),i},provide:i=>B.decorations.from(i,e=>e?e.deco:$.none)});function ee(i,e){return m.create(i.filter(t=>t.field==e).map(t=>m.range(t.from,t.to)))}function pt(i){let e=_.parse(i);return(t,n,s,o)=>{let{text:l,ranges:r}=e.instantiate(t.state,s),a={changes:{from:s,to:o,insert:je.of(l)},scrollIntoView:!0,annotations:ve.of(n)};if(r.length&&(a.selection=ee(r,0)),r.length>1){let c=new T(r,0),f=a.effects=[D.of(c)];t.state.field(M,!1)===void 0&&f.push(C.appendConfig.of([M,xt,yt,Pe]))}t.dispatch(t.state.update(a))}}function Ee(i){return({state:e,dispatch:t})=>{let n=e.field(M,!1);if(!n||i<0&&n.active==0)return!1;let s=n.active+i,o=i>0&&!n.ranges.some(l=>l.field==s+i);return t(e.update({selection:ee(n.ranges,s),effects:D.of(o?null:new T(n.ranges,s))})),!0}}const dt=({state:i,dispatch:e})=>i.field(M,!1)?(e(i.update({effects:D.of(null)})),!0):!1,mt=Ee(1),gt=Ee(-1),bt=[{key:"Tab",run:mt,shift:gt},{key:"Escape",run:dt}],ue=be.define({combine(i){return i.length?i[0]:bt}}),xt=me.highest(ge.compute([ue],i=>i.facet(ue)));function Dt(i,e){return Object.assign(Object.assign({},e),{apply:pt(i)})}const yt=B.domEventHandlers({mousedown(i,e){let t=e.state.field(M,!1),n;if(!t||(n=e.posAtCoords({x:i.clientX,y:i.clientY}))==null)return!1;let s=t.ranges.find(o=>o.from<=n&&o.to>=n);return!s||s.field==t.active?!1:(e.dispatch({selection:ee(t.ranges,s.field),effects:D.of(t.ranges.some(o=>o.field>s.field)?new T(t.ranges,s.field):null)}),!0)}}),L={brackets:["(","[","{","'",'"'],before:")]}:;>",stringPrefixes:[]},E=C.define({map(i,e){let t=e.mapPos(i,-1,X.TrackAfter);return t??void 0}}),te=C.define({map(i,e){return e.mapPos(i)}}),ie=new class extends Fe{};ie.startSide=1;ie.endSide=-1;const Ae=J.define({create(){return ne.empty},update(i,e){if(e.selection){let t=e.state.doc.lineAt(e.selection.main.head).from,n=e.startState.doc.lineAt(e.startState.selection.main.head).from;t!=e.changes.mapPos(n,-1)&&(i=ne.empty)}i=i.map(e.changes);for(let t of e.effects)t.is(E)?i=i.update({add:[ie.range(t.value,t.value+1)]}):t.is(te)&&(i=i.update({filter:n=>n!=t.value}));return i}});function kt(){return[vt,Ae]}const q="()[]{}<>";function Oe(i){for(let e=0;e<q.length;e+=2)if(q.charCodeAt(e)==i)return q.charAt(e+1);return xe(i<128?i:i+1)}function Te(i,e){return i.languageDataAt("closeBrackets",e)[0]||L}const wt=typeof navigator=="object"&&/Android\b/.test(navigator.userAgent),vt=B.inputHandler.of((i,e,t,n)=>{if((wt?i.composing:i.compositionStarted)||i.state.readOnly)return!1;let s=i.state.selection.main;if(n.length>2||n.length==2&&I(y(n,0))==1||e!=s.from||t!=s.to)return!1;let o=St(i.state,n);return o?(i.dispatch(o),!0):!1}),Ct=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let n=Te(i,i.selection.main.head).brackets||L.brackets,s=null,o=i.changeByRange(l=>{if(l.empty){let r=It(i.doc,l.head);for(let a of n)if(a==r&&V(i.doc,l.head)==Oe(y(a,0)))return{changes:{from:l.head-a.length,to:l.head+a.length},range:m.cursor(l.head-a.length)}}return{range:s=l}});return s||e(i.update(o,{scrollIntoView:!0,userEvent:"delete.backward"})),!s},Ft=[{key:"Backspace",run:Ct}];function St(i,e){let t=Te(i,i.selection.main.head),n=t.brackets||L.brackets;for(let s of n){let o=Oe(y(s,0));if(e==s)return o==s?At(i,s,n.indexOf(s+s+s)>-1,t):Pt(i,s,o,t.before||L.before);if(e==o&&Re(i,i.selection.main.from))return Et(i,s,o)}return null}function Re(i,e){let t=!1;return i.field(Ae).between(0,i.doc.length,n=>{n==e&&(t=!0)}),t}function V(i,e){let t=i.sliceString(e,e+2);return t.slice(0,I(y(t,0)))}function It(i,e){let t=i.sliceString(e-2,e);return I(y(t,0))==t.length?t:t.slice(1)}function Pt(i,e,t,n){let s=null,o=i.changeByRange(l=>{if(!l.empty)return{changes:[{insert:e,from:l.from},{insert:t,from:l.to}],effects:E.of(l.to+e.length),range:m.range(l.anchor+e.length,l.head+e.length)};let r=V(i.doc,l.head);return!r||/\s/.test(r)||n.indexOf(r)>-1?{changes:{insert:e+t,from:l.head},effects:E.of(l.head+e.length),range:m.cursor(l.head+e.length)}:{range:s=l}});return s?null:i.update(o,{scrollIntoView:!0,userEvent:"input.type"})}function Et(i,e,t){let n=null,s=i.selection.ranges.map(o=>o.empty&&V(i.doc,o.head)==t?m.cursor(o.head+t.length):n=o);return n?null:i.update({selection:m.create(s,i.selection.mainIndex),scrollIntoView:!0,effects:i.selection.ranges.map(({from:o})=>te.of(o))})}function At(i,e,t,n){let s=n.stringPrefixes||L.stringPrefixes,o=null,l=i.changeByRange(r=>{if(!r.empty)return{changes:[{insert:e,from:r.from},{insert:e,from:r.to}],effects:E.of(r.to+e.length),range:m.range(r.anchor+e.length,r.head+e.length)};let a=r.head,c=V(i.doc,a),f;if(c==e){if(pe(i,a))return{changes:{insert:e+e,from:a},effects:E.of(a+e.length),range:m.cursor(a+e.length)};if(Re(i,a)){let h=t&&i.sliceDoc(a,a+e.length*3)==e+e+e;return{range:m.cursor(a+e.length*(h?3:1)),effects:te.of(a)}}}else{if(t&&i.sliceDoc(a-2*e.length,a)==e+e&&(f=de(i,a-2*e.length,s))>-1&&pe(i,f))return{changes:{insert:e+e+e+e,from:a},effects:E.of(a+e.length),range:m.cursor(a+e.length)};if(i.charCategorizer(a)(c)!=K.Word&&de(i,a,s)>-1&&!Ot(i,a,e,s))return{changes:{insert:e+e,from:a},effects:E.of(a+e.length),range:m.cursor(a+e.length)}}return{range:o=r}});return o?null:i.update(l,{scrollIntoView:!0,userEvent:"input.type"})}function pe(i,e){let t=N(i).resolveInner(e+1);return t.parent&&t.from==e}function Ot(i,e,t,n){let s=N(i).resolveInner(e,-1),o=n.reduce((l,r)=>Math.max(l,r.length),0);for(let l=0;l<5;l++){let r=i.sliceDoc(s.from,Math.min(s.to,s.from+t.length+o)),a=r.indexOf(t);if(!a||a>-1&&n.indexOf(r.slice(0,a))>-1){let f=s.firstChild;for(;f&&f.from==s.from&&f.to-f.from>t.length+a;){if(i.sliceDoc(f.to-t.length,f.to)==t)return!1;f=f.firstChild}return!0}let c=s.to==e&&s.parent;if(!c)break;s=c}return!1}function de(i,e,t){let n=i.charCategorizer(e);if(n(i.sliceDoc(e-1,e))!=K.Word)return e;for(let s of t){let o=e-s.length;if(i.sliceDoc(o,e)==s&&n(i.sliceDoc(o-1,o))!=K.Word)return o}return-1}function jt(i={}){return[b,x.of(i),at,Rt,Pe]}const Tt=[{key:"Ctrl-Space",run:nt},{key:"Escape",run:st},{key:"ArrowDown",run:j(!0)},{key:"ArrowUp",run:j(!1)},{key:"PageDown",run:j(!0,"page")},{key:"PageUp",run:j(!1,"page")},{key:"Enter",run:it}],Rt=me.highest(ge.computeN([x],i=>i.facet(x).defaultKeymap?[Tt]:[]));export{jt as a,Ft as b,kt as c,Tt as d,ze as e,Bt as i,Dt as s};
