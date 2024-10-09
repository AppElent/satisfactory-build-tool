import{G as k}from"./graph--zP8QYNC.js";import{b9 as Pn,ba as Sn,bb as On,aP as Fn,bc as Vn,aU as ln,aM as en,aT as B,aS as vn,bd as Bn,aO as W,az as An,be as Gn,aX as Yn,aB as Dn,bf as $n,bg as j}from"./index-DC-z8vu0.js";import{l as pn,m as mn,d as X,k as qn,n as Wn,a as jn,c as s,h as m,i as g,f as I,v as y,r as O}from"./_baseUniq-CkvxXgab.js";import{f as L,b as wn,a as zn,c as Xn,d as Un,t as A,m as w,e as _,g as U,l as P,h as Hn}from"./_basePickBy-Cba4_QlM.js";function Jn(n){return Pn(Sn(n,void 0,L),n+"")}function Zn(n,e){return n==null?n:On(n,pn(e),Fn)}function Kn(n,e){return n&&mn(n,pn(e))}function Qn(n,e){return n>e}function F(n,e){var r={};return e=X(e),mn(n,function(i,t,a){Vn(r,t,e(i,t,a))}),r}function x(n){return n&&n.length?wn(n,ln,Qn):void 0}function H(n,e){return n&&n.length?wn(n,X(e),zn):void 0}function ne(n,e){var r=n.length;for(n.sort(e);r--;)n[r]=n[r].value;return n}function ee(n,e){if(n!==e){var r=n!==void 0,i=n===null,t=n===n,a=en(n),o=e!==void 0,u=e===null,d=e===e,f=en(e);if(!u&&!f&&!a&&n>e||a&&o&&d&&!u&&!f||i&&o&&d||!r&&d||!t)return 1;if(!i&&!a&&!f&&n<e||f&&r&&t&&!i&&!a||u&&r&&t||!o&&t||!d)return-1}return 0}function re(n,e,r){for(var i=-1,t=n.criteria,a=e.criteria,o=t.length,u=r.length;++i<o;){var d=ee(t[i],a[i]);if(d){if(i>=u)return d;var f=r[i];return d*(f=="desc"?-1:1)}}return n.index-e.index}function ie(n,e,r){e.length?e=B(e,function(a){return vn(a)?function(o){return qn(o,a.length===1?a[0]:a)}:a}):e=[ln];var i=-1;e=B(e,Bn(X));var t=Xn(n,function(a,o,u){var d=B(e,function(f){return f(a)});return{criteria:d,index:++i,value:a}});return ne(t,function(a,o){return re(a,o,r)})}function te(n,e){return Un(n,e,function(r,i){return Wn(n,i)})}var S=Jn(function(n,e){return n==null?{}:te(n,e)}),ae=Math.ceil,oe=Math.max;function ue(n,e,r,i){for(var t=-1,a=oe(ae((e-n)/(r||1)),0),o=Array(a);a--;)o[++t]=n,n+=r;return o}function de(n){return function(e,r,i){return i&&typeof i!="number"&&W(e,r,i)&&(r=i=void 0),e=A(e),r===void 0?(r=e,e=0):r=A(r),i=i===void 0?e<r?1:-1:A(i),ue(e,r,i)}}var N=de(),M=An(function(n,e){if(n==null)return[];var r=e.length;return r>1&&W(n,e[0],e[1])?e=[]:r>2&&W(e[0],e[1],e[2])&&(e=[e[0]]),ie(n,jn(e),[])}),fe=0;function J(n){var e=++fe;return Gn(n)+e}function se(n,e,r){for(var i=-1,t=n.length,a=e.length,o={};++i<t;){var u=i<a?e[i]:void 0;r(o,n[i],u)}return o}function ce(n,e){return se(n||[],e||[],Yn)}class he{constructor(){var e={};e._next=e._prev=e,this._sentinel=e}dequeue(){var e=this._sentinel,r=e._prev;if(r!==e)return rn(r),r}enqueue(e){var r=this._sentinel;e._prev&&e._next&&rn(e),e._next=r._next,r._next._prev=e,r._next=e,e._prev=r}toString(){for(var e=[],r=this._sentinel,i=r._prev;i!==r;)e.push(JSON.stringify(i,le)),i=i._prev;return"["+e.join(", ")+"]"}}function rn(n){n._prev._next=n._next,n._next._prev=n._prev,delete n._next,delete n._prev}function le(n,e){if(n!=="_next"&&n!=="_prev")return e}var ve=Dn(1);function pe(n,e){if(n.nodeCount()<=1)return[];var r=we(n,e||ve),i=me(r.graph,r.buckets,r.zeroIdx);return L(w(i,function(t){return n.outEdges(t.v,t.w)}))}function me(n,e,r){for(var i=[],t=e[e.length-1],a=e[0],o;n.nodeCount();){for(;o=a.dequeue();)G(n,e,r,o);for(;o=t.dequeue();)G(n,e,r,o);if(n.nodeCount()){for(var u=e.length-2;u>0;--u)if(o=e[u].dequeue(),o){i=i.concat(G(n,e,r,o,!0));break}}}return i}function G(n,e,r,i,t){var a=t?[]:void 0;return s(n.inEdges(i.v),function(o){var u=n.edge(o),d=n.node(o.v);t&&a.push({v:o.v,w:o.w}),d.out-=u,z(e,r,d)}),s(n.outEdges(i.v),function(o){var u=n.edge(o),d=o.w,f=n.node(d);f.in-=u,z(e,r,f)}),n.removeNode(i.v),a}function we(n,e){var r=new k,i=0,t=0;s(n.nodes(),function(u){r.setNode(u,{v:u,in:0,out:0})}),s(n.edges(),function(u){var d=r.edge(u.v,u.w)||0,f=e(u),c=d+f;r.setEdge(u.v,u.w,c),t=Math.max(t,r.node(u.v).out+=f),i=Math.max(i,r.node(u.w).in+=f)});var a=N(t+i+3).map(function(){return new he}),o=i+1;return s(r.nodes(),function(u){z(a,o,r.node(u))}),{graph:r,buckets:a,zeroIdx:o}}function z(n,e,r){r.out?r.in?n[r.out-r.in+e].enqueue(r):n[n.length-1].enqueue(r):n[0].enqueue(r)}function be(n){var e=n.graph().acyclicer==="greedy"?pe(n,r(n)):ge(n);s(e,function(i){var t=n.edge(i);n.removeEdge(i),t.forwardName=i.name,t.reversed=!0,n.setEdge(i.w,i.v,t,J("rev"))});function r(i){return function(t){return i.edge(t).weight}}}function ge(n){var e=[],r={},i={};function t(a){m(i,a)||(i[a]=!0,r[a]=!0,s(n.outEdges(a),function(o){m(r,o.w)?e.push(o):t(o.w)}),delete r[a])}return s(n.nodes(),t),e}function ke(n){s(n.edges(),function(e){var r=n.edge(e);if(r.reversed){n.removeEdge(e);var i=r.forwardName;delete r.reversed,delete r.forwardName,n.setEdge(e.w,e.v,r,i)}})}function C(n,e,r,i){var t;do t=J(i);while(n.hasNode(t));return r.dummy=e,n.setNode(t,r),t}function xe(n){var e=new k().setGraph(n.graph());return s(n.nodes(),function(r){e.setNode(r,n.node(r))}),s(n.edges(),function(r){var i=e.edge(r.v,r.w)||{weight:0,minlen:1},t=n.edge(r);e.setEdge(r.v,r.w,{weight:i.weight+t.weight,minlen:Math.max(i.minlen,t.minlen)})}),e}function bn(n){var e=new k({multigraph:n.isMultigraph()}).setGraph(n.graph());return s(n.nodes(),function(r){n.children(r).length||e.setNode(r,n.node(r))}),s(n.edges(),function(r){e.setEdge(r,n.edge(r))}),e}function tn(n,e){var r=n.x,i=n.y,t=e.x-r,a=e.y-i,o=n.width/2,u=n.height/2;if(!t&&!a)throw new Error("Not possible to find intersection inside of the rectangle");var d,f;return Math.abs(a)*o>Math.abs(t)*u?(a<0&&(u=-u),d=u*t/a,f=u):(t<0&&(o=-o),d=o,f=o*a/t),{x:r+d,y:i+f}}function V(n){var e=w(N(gn(n)+1),function(){return[]});return s(n.nodes(),function(r){var i=n.node(r),t=i.rank;g(t)||(e[t][i.order]=r)}),e}function Ee(n){var e=_(w(n.nodes(),function(r){return n.node(r).rank}));s(n.nodes(),function(r){var i=n.node(r);m(i,"rank")&&(i.rank-=e)})}function ye(n){var e=_(w(n.nodes(),function(a){return n.node(a).rank})),r=[];s(n.nodes(),function(a){var o=n.node(a).rank-e;r[o]||(r[o]=[]),r[o].push(a)});var i=0,t=n.graph().nodeRankFactor;s(r,function(a,o){g(a)&&o%t!==0?--i:i&&s(a,function(u){n.node(u).rank+=i})})}function an(n,e,r,i){var t={width:0,height:0};return arguments.length>=4&&(t.rank=r,t.order=i),C(n,"border",t,e)}function gn(n){return x(w(n.nodes(),function(e){var r=n.node(e).rank;if(!g(r))return r}))}function Ne(n,e){var r={lhs:[],rhs:[]};return s(n,function(i){e(i)?r.lhs.push(i):r.rhs.push(i)}),r}function Le(n,e){return e()}function Ce(n){function e(r){var i=n.children(r),t=n.node(r);if(i.length&&s(i,e),m(t,"minRank")){t.borderLeft=[],t.borderRight=[];for(var a=t.minRank,o=t.maxRank+1;a<o;++a)on(n,"borderLeft","_bl",r,t,a),on(n,"borderRight","_br",r,t,a)}}s(n.children(),e)}function on(n,e,r,i,t,a){var o={width:0,height:0,rank:a,borderType:e},u=t[e][a-1],d=C(n,"border",o,r);t[e][a]=d,n.setParent(d,i),u&&n.setEdge(u,d,{weight:1})}function Re(n){var e=n.graph().rankdir.toLowerCase();(e==="lr"||e==="rl")&&kn(n)}function _e(n){var e=n.graph().rankdir.toLowerCase();(e==="bt"||e==="rl")&&Te(n),(e==="lr"||e==="rl")&&(Ie(n),kn(n))}function kn(n){s(n.nodes(),function(e){un(n.node(e))}),s(n.edges(),function(e){un(n.edge(e))})}function un(n){var e=n.width;n.width=n.height,n.height=e}function Te(n){s(n.nodes(),function(e){Y(n.node(e))}),s(n.edges(),function(e){var r=n.edge(e);s(r.points,Y),m(r,"y")&&Y(r)})}function Y(n){n.y=-n.y}function Ie(n){s(n.nodes(),function(e){D(n.node(e))}),s(n.edges(),function(e){var r=n.edge(e);s(r.points,D),m(r,"x")&&D(r)})}function D(n){var e=n.x;n.x=n.y,n.y=e}function Me(n){n.graph().dummyChains=[],s(n.edges(),function(e){Pe(n,e)})}function Pe(n,e){var r=e.v,i=n.node(r).rank,t=e.w,a=n.node(t).rank,o=e.name,u=n.edge(e),d=u.labelRank;if(a!==i+1){n.removeEdge(e);var f,c,h;for(h=0,++i;i<a;++h,++i)u.points=[],c={width:0,height:0,edgeLabel:u,edgeObj:e,rank:i},f=C(n,"edge",c,"_d"),i===d&&(c.width=u.width,c.height=u.height,c.dummy="edge-label",c.labelpos=u.labelpos),n.setEdge(r,f,{weight:u.weight},o),h===0&&n.graph().dummyChains.push(f),r=f;n.setEdge(r,t,{weight:u.weight},o)}}function Se(n){s(n.graph().dummyChains,function(e){var r=n.node(e),i=r.edgeLabel,t;for(n.setEdge(r.edgeObj,i);r.dummy;)t=n.successors(e)[0],n.removeNode(e),i.points.push({x:r.x,y:r.y}),r.dummy==="edge-label"&&(i.x=r.x,i.y=r.y,i.width=r.width,i.height=r.height),e=t,r=n.node(e)})}function Z(n){var e={};function r(i){var t=n.node(i);if(m(e,i))return t.rank;e[i]=!0;var a=_(w(n.outEdges(i),function(o){return r(o.w)-n.edge(o).minlen}));return(a===Number.POSITIVE_INFINITY||a===void 0||a===null)&&(a=0),t.rank=a}s(n.sources(),r)}function T(n,e){return n.node(e.w).rank-n.node(e.v).rank-n.edge(e).minlen}function xn(n){var e=new k({directed:!1}),r=n.nodes()[0],i=n.nodeCount();e.setNode(r,{});for(var t,a;Oe(e,n)<i;)t=Fe(e,n),a=e.hasNode(t.v)?T(n,t):-T(n,t),Ve(e,n,a);return e}function Oe(n,e){function r(i){s(e.nodeEdges(i),function(t){var a=t.v,o=i===a?t.w:a;!n.hasNode(o)&&!T(e,t)&&(n.setNode(o,{}),n.setEdge(i,o,{}),r(o))})}return s(n.nodes(),r),n.nodeCount()}function Fe(n,e){return H(e.edges(),function(r){if(n.hasNode(r.v)!==n.hasNode(r.w))return T(e,r)})}function Ve(n,e,r){s(n.nodes(),function(i){e.node(i).rank+=r})}function Be(){}Be.prototype=new Error;function En(n,e,r){vn(e)||(e=[e]);var i=(n.isDirected()?n.successors:n.neighbors).bind(n),t=[],a={};return s(e,function(o){if(!n.hasNode(o))throw new Error("Graph does not have node: "+o);yn(n,o,r==="post",a,i,t)}),t}function yn(n,e,r,i,t,a){m(i,e)||(i[e]=!0,r||a.push(e),s(t(e),function(o){yn(n,o,r,i,t,a)}),r&&a.push(e))}function Ae(n,e){return En(n,e,"post")}function Ge(n,e){return En(n,e,"pre")}E.initLowLimValues=Q;E.initCutValues=K;E.calcCutValue=Nn;E.leaveEdge=Cn;E.enterEdge=Rn;E.exchangeEdges=_n;function E(n){n=xe(n),Z(n);var e=xn(n);Q(e),K(e,n);for(var r,i;r=Cn(e);)i=Rn(e,n,r),_n(e,n,r,i)}function K(n,e){var r=Ae(n,n.nodes());r=r.slice(0,r.length-1),s(r,function(i){Ye(n,e,i)})}function Ye(n,e,r){var i=n.node(r),t=i.parent;n.edge(r,t).cutvalue=Nn(n,e,r)}function Nn(n,e,r){var i=n.node(r),t=i.parent,a=!0,o=e.edge(r,t),u=0;return o||(a=!1,o=e.edge(t,r)),u=o.weight,s(e.nodeEdges(r),function(d){var f=d.v===r,c=f?d.w:d.v;if(c!==t){var h=f===a,l=e.edge(d).weight;if(u+=h?l:-l,$e(n,r,c)){var v=n.edge(r,c).cutvalue;u+=h?-v:v}}}),u}function Q(n,e){arguments.length<2&&(e=n.nodes()[0]),Ln(n,{},1,e)}function Ln(n,e,r,i,t){var a=r,o=n.node(i);return e[i]=!0,s(n.neighbors(i),function(u){m(e,u)||(r=Ln(n,e,r,u,i))}),o.low=a,o.lim=r++,t?o.parent=t:delete o.parent,r}function Cn(n){return U(n.edges(),function(e){return n.edge(e).cutvalue<0})}function Rn(n,e,r){var i=r.v,t=r.w;e.hasEdge(i,t)||(i=r.w,t=r.v);var a=n.node(i),o=n.node(t),u=a,d=!1;a.lim>o.lim&&(u=o,d=!0);var f=I(e.edges(),function(c){return d===dn(n,n.node(c.v),u)&&d!==dn(n,n.node(c.w),u)});return H(f,function(c){return T(e,c)})}function _n(n,e,r,i){var t=r.v,a=r.w;n.removeEdge(t,a),n.setEdge(i.v,i.w,{}),Q(n),K(n,e),De(n,e)}function De(n,e){var r=U(n.nodes(),function(t){return!e.node(t).parent}),i=Ge(n,r);i=i.slice(1),s(i,function(t){var a=n.node(t).parent,o=e.edge(t,a),u=!1;o||(o=e.edge(a,t),u=!0),e.node(t).rank=e.node(a).rank+(u?o.minlen:-o.minlen)})}function $e(n,e,r){return n.hasEdge(e,r)}function dn(n,e,r){return r.low<=e.lim&&e.lim<=r.lim}function qe(n){switch(n.graph().ranker){case"network-simplex":fn(n);break;case"tight-tree":je(n);break;case"longest-path":We(n);break;default:fn(n)}}var We=Z;function je(n){Z(n),xn(n)}function fn(n){E(n)}function ze(n){var e=C(n,"root",{},"_root"),r=Xe(n),i=x(y(r))-1,t=2*i+1;n.graph().nestingRoot=e,s(n.edges(),function(o){n.edge(o).minlen*=t});var a=Ue(n)+1;s(n.children(),function(o){Tn(n,e,t,a,i,r,o)}),n.graph().nodeRankFactor=t}function Tn(n,e,r,i,t,a,o){var u=n.children(o);if(!u.length){o!==e&&n.setEdge(e,o,{weight:0,minlen:r});return}var d=an(n,"_bt"),f=an(n,"_bb"),c=n.node(o);n.setParent(d,o),c.borderTop=d,n.setParent(f,o),c.borderBottom=f,s(u,function(h){Tn(n,e,r,i,t,a,h);var l=n.node(h),v=l.borderTop?l.borderTop:h,p=l.borderBottom?l.borderBottom:h,b=l.borderTop?i:2*i,R=v!==p?1:t-a[o]+1;n.setEdge(d,v,{weight:b,minlen:R,nestingEdge:!0}),n.setEdge(p,f,{weight:b,minlen:R,nestingEdge:!0})}),n.parent(o)||n.setEdge(e,d,{weight:0,minlen:t+a[o]})}function Xe(n){var e={};function r(i,t){var a=n.children(i);a&&a.length&&s(a,function(o){r(o,t+1)}),e[i]=t}return s(n.children(),function(i){r(i,1)}),e}function Ue(n){return O(n.edges(),function(e,r){return e+n.edge(r).weight},0)}function He(n){var e=n.graph();n.removeNode(e.nestingRoot),delete e.nestingRoot,s(n.edges(),function(r){var i=n.edge(r);i.nestingEdge&&n.removeEdge(r)})}function Je(n,e,r){var i={},t;s(r,function(a){for(var o=n.parent(a),u,d;o;){if(u=n.parent(o),u?(d=i[u],i[u]=o):(d=t,t=o),d&&d!==o){e.setEdge(d,o);return}o=u}})}function Ze(n,e,r){var i=Ke(n),t=new k({compound:!0}).setGraph({root:i}).setDefaultNodeLabel(function(a){return n.node(a)});return s(n.nodes(),function(a){var o=n.node(a),u=n.parent(a);(o.rank===e||o.minRank<=e&&e<=o.maxRank)&&(t.setNode(a),t.setParent(a,u||i),s(n[r](a),function(d){var f=d.v===a?d.w:d.v,c=t.edge(f,a),h=g(c)?0:c.weight;t.setEdge(f,a,{weight:n.edge(d).weight+h})}),m(o,"minRank")&&t.setNode(a,{borderLeft:o.borderLeft[e],borderRight:o.borderRight[e]}))}),t}function Ke(n){for(var e;n.hasNode(e=J("_root")););return e}function Qe(n,e){for(var r=0,i=1;i<e.length;++i)r+=nr(n,e[i-1],e[i]);return r}function nr(n,e,r){for(var i=ce(r,w(r,function(f,c){return c})),t=L(w(e,function(f){return M(w(n.outEdges(f),function(c){return{pos:i[c.w],weight:n.edge(c).weight}}),"pos")})),a=1;a<r.length;)a<<=1;var o=2*a-1;a-=1;var u=w(new Array(o),function(){return 0}),d=0;return s(t.forEach(function(f){var c=f.pos+a;u[c]+=f.weight;for(var h=0;c>0;)c%2&&(h+=u[c+1]),c=c-1>>1,u[c]+=f.weight;d+=f.weight*h})),d}function er(n){var e={},r=I(n.nodes(),function(u){return!n.children(u).length}),i=x(w(r,function(u){return n.node(u).rank})),t=w(N(i+1),function(){return[]});function a(u){if(!m(e,u)){e[u]=!0;var d=n.node(u);t[d.rank].push(u),s(n.successors(u),a)}}var o=M(r,function(u){return n.node(u).rank});return s(o,a),t}function rr(n,e){return w(e,function(r){var i=n.inEdges(r);if(i.length){var t=O(i,function(a,o){var u=n.edge(o),d=n.node(o.v);return{sum:a.sum+u.weight*d.order,weight:a.weight+u.weight}},{sum:0,weight:0});return{v:r,barycenter:t.sum/t.weight,weight:t.weight}}else return{v:r}})}function ir(n,e){var r={};s(n,function(t,a){var o=r[t.v]={indegree:0,in:[],out:[],vs:[t.v],i:a};g(t.barycenter)||(o.barycenter=t.barycenter,o.weight=t.weight)}),s(e.edges(),function(t){var a=r[t.v],o=r[t.w];!g(a)&&!g(o)&&(o.indegree++,a.out.push(r[t.w]))});var i=I(r,function(t){return!t.indegree});return tr(i)}function tr(n){var e=[];function r(a){return function(o){o.merged||(g(o.barycenter)||g(a.barycenter)||o.barycenter>=a.barycenter)&&ar(a,o)}}function i(a){return function(o){o.in.push(a),--o.indegree===0&&n.push(o)}}for(;n.length;){var t=n.pop();e.push(t),s(t.in.reverse(),r(t)),s(t.out,i(t))}return w(I(e,function(a){return!a.merged}),function(a){return S(a,["vs","i","barycenter","weight"])})}function ar(n,e){var r=0,i=0;n.weight&&(r+=n.barycenter*n.weight,i+=n.weight),e.weight&&(r+=e.barycenter*e.weight,i+=e.weight),n.vs=e.vs.concat(n.vs),n.barycenter=r/i,n.weight=i,n.i=Math.min(e.i,n.i),e.merged=!0}function or(n,e){var r=Ne(n,function(c){return m(c,"barycenter")}),i=r.lhs,t=M(r.rhs,function(c){return-c.i}),a=[],o=0,u=0,d=0;i.sort(ur(!!e)),d=sn(a,t,d),s(i,function(c){d+=c.vs.length,a.push(c.vs),o+=c.barycenter*c.weight,u+=c.weight,d=sn(a,t,d)});var f={vs:L(a)};return u&&(f.barycenter=o/u,f.weight=u),f}function sn(n,e,r){for(var i;e.length&&(i=P(e)).i<=r;)e.pop(),n.push(i.vs),r++;return r}function ur(n){return function(e,r){return e.barycenter<r.barycenter?-1:e.barycenter>r.barycenter?1:n?r.i-e.i:e.i-r.i}}function In(n,e,r,i){var t=n.children(e),a=n.node(e),o=a?a.borderLeft:void 0,u=a?a.borderRight:void 0,d={};o&&(t=I(t,function(p){return p!==o&&p!==u}));var f=rr(n,t);s(f,function(p){if(n.children(p.v).length){var b=In(n,p.v,r,i);d[p.v]=b,m(b,"barycenter")&&fr(p,b)}});var c=ir(f,r);dr(c,d);var h=or(c,i);if(o&&(h.vs=L([o,h.vs,u]),n.predecessors(o).length)){var l=n.node(n.predecessors(o)[0]),v=n.node(n.predecessors(u)[0]);m(h,"barycenter")||(h.barycenter=0,h.weight=0),h.barycenter=(h.barycenter*h.weight+l.order+v.order)/(h.weight+2),h.weight+=2}return h}function dr(n,e){s(n,function(r){r.vs=L(r.vs.map(function(i){return e[i]?e[i].vs:i}))})}function fr(n,e){g(n.barycenter)?(n.barycenter=e.barycenter,n.weight=e.weight):(n.barycenter=(n.barycenter*n.weight+e.barycenter*e.weight)/(n.weight+e.weight),n.weight+=e.weight)}function sr(n){var e=gn(n),r=cn(n,N(1,e+1),"inEdges"),i=cn(n,N(e-1,-1,-1),"outEdges"),t=er(n);hn(n,t);for(var a=Number.POSITIVE_INFINITY,o,u=0,d=0;d<4;++u,++d){cr(u%2?r:i,u%4>=2),t=V(n);var f=Qe(n,t);f<a&&(d=0,o=$n(t),a=f)}hn(n,o)}function cn(n,e,r){return w(e,function(i){return Ze(n,i,r)})}function cr(n,e){var r=new k;s(n,function(i){var t=i.graph().root,a=In(i,t,r,e);s(a.vs,function(o,u){i.node(o).order=u}),Je(i,r,a.vs)})}function hn(n,e){s(e,function(r){s(r,function(i,t){n.node(i).order=t})})}function hr(n){var e=vr(n);s(n.graph().dummyChains,function(r){for(var i=n.node(r),t=i.edgeObj,a=lr(n,e,t.v,t.w),o=a.path,u=a.lca,d=0,f=o[d],c=!0;r!==t.w;){if(i=n.node(r),c){for(;(f=o[d])!==u&&n.node(f).maxRank<i.rank;)d++;f===u&&(c=!1)}if(!c){for(;d<o.length-1&&n.node(f=o[d+1]).minRank<=i.rank;)d++;f=o[d]}n.setParent(r,f),r=n.successors(r)[0]}})}function lr(n,e,r,i){var t=[],a=[],o=Math.min(e[r].low,e[i].low),u=Math.max(e[r].lim,e[i].lim),d,f;d=r;do d=n.parent(d),t.push(d);while(d&&(e[d].low>o||u>e[d].lim));for(f=d,d=i;(d=n.parent(d))!==f;)a.push(d);return{path:t.concat(a.reverse()),lca:f}}function vr(n){var e={},r=0;function i(t){var a=r;s(n.children(t),i),e[t]={low:a,lim:r++}}return s(n.children(),i),e}function pr(n,e){var r={};function i(t,a){var o=0,u=0,d=t.length,f=P(a);return s(a,function(c,h){var l=wr(n,c),v=l?n.node(l).order:d;(l||c===f)&&(s(a.slice(u,h+1),function(p){s(n.predecessors(p),function(b){var R=n.node(b),nn=R.order;(nn<o||v<nn)&&!(R.dummy&&n.node(p).dummy)&&Mn(r,b,p)})}),u=h+1,o=v)}),a}return O(e,i),r}function mr(n,e){var r={};function i(a,o,u,d,f){var c;s(N(o,u),function(h){c=a[h],n.node(c).dummy&&s(n.predecessors(c),function(l){var v=n.node(l);v.dummy&&(v.order<d||v.order>f)&&Mn(r,l,c)})})}function t(a,o){var u=-1,d,f=0;return s(o,function(c,h){if(n.node(c).dummy==="border"){var l=n.predecessors(c);l.length&&(d=n.node(l[0]).order,i(o,f,h,u,d),f=h,u=d)}i(o,f,o.length,d,a.length)}),o}return O(e,t),r}function wr(n,e){if(n.node(e).dummy)return U(n.predecessors(e),function(r){return n.node(r).dummy})}function Mn(n,e,r){if(e>r){var i=e;e=r,r=i}var t=n[e];t||(n[e]=t={}),t[r]=!0}function br(n,e,r){if(e>r){var i=e;e=r,r=i}return m(n[e],r)}function gr(n,e,r,i){var t={},a={},o={};return s(e,function(u){s(u,function(d,f){t[d]=d,a[d]=d,o[d]=f})}),s(e,function(u){var d=-1;s(u,function(f){var c=i(f);if(c.length){c=M(c,function(b){return o[b]});for(var h=(c.length-1)/2,l=Math.floor(h),v=Math.ceil(h);l<=v;++l){var p=c[l];a[f]===f&&d<o[p]&&!br(r,f,p)&&(a[p]=f,a[f]=t[f]=t[p],d=o[p])}}})}),{root:t,align:a}}function kr(n,e,r,i,t){var a={},o=xr(n,e,r,t),u=t?"borderLeft":"borderRight";function d(h,l){for(var v=o.nodes(),p=v.pop(),b={};p;)b[p]?h(p):(b[p]=!0,v.push(p),v=v.concat(l(p))),p=v.pop()}function f(h){a[h]=o.inEdges(h).reduce(function(l,v){return Math.max(l,a[v.v]+o.edge(v))},0)}function c(h){var l=o.outEdges(h).reduce(function(p,b){return Math.min(p,a[b.w]-o.edge(b))},Number.POSITIVE_INFINITY),v=n.node(h);l!==Number.POSITIVE_INFINITY&&v.borderType!==u&&(a[h]=Math.max(a[h],l))}return d(f,o.predecessors.bind(o)),d(c,o.successors.bind(o)),s(i,function(h){a[h]=a[r[h]]}),a}function xr(n,e,r,i){var t=new k,a=n.graph(),o=Cr(a.nodesep,a.edgesep,i);return s(e,function(u){var d;s(u,function(f){var c=r[f];if(t.setNode(c),d){var h=r[d],l=t.edge(h,c);t.setEdge(h,c,Math.max(o(n,f,d),l||0))}d=f})}),t}function Er(n,e){return H(y(e),function(r){var i=Number.NEGATIVE_INFINITY,t=Number.POSITIVE_INFINITY;return Zn(r,function(a,o){var u=Rr(n,o)/2;i=Math.max(a+u,i),t=Math.min(a-u,t)}),i-t})}function yr(n,e){var r=y(e),i=_(r),t=x(r);s(["u","d"],function(a){s(["l","r"],function(o){var u=a+o,d=n[u],f;if(d!==e){var c=y(d);f=o==="l"?i-_(c):t-x(c),f&&(n[u]=F(d,function(h){return h+f}))}})})}function Nr(n,e){return F(n.ul,function(r,i){if(e)return n[e.toLowerCase()][i];var t=M(w(n,i));return(t[1]+t[2])/2})}function Lr(n){var e=V(n),r=j(pr(n,e),mr(n,e)),i={},t;s(["u","d"],function(o){t=o==="u"?e:y(e).reverse(),s(["l","r"],function(u){u==="r"&&(t=w(t,function(h){return y(h).reverse()}));var d=(o==="u"?n.predecessors:n.successors).bind(n),f=gr(n,t,r,d),c=kr(n,t,f.root,f.align,u==="r");u==="r"&&(c=F(c,function(h){return-h})),i[o+u]=c})});var a=Er(n,i);return yr(i,a),Nr(i,n.graph().align)}function Cr(n,e,r){return function(i,t,a){var o=i.node(t),u=i.node(a),d=0,f;if(d+=o.width/2,m(o,"labelpos"))switch(o.labelpos.toLowerCase()){case"l":f=-o.width/2;break;case"r":f=o.width/2;break}if(f&&(d+=r?f:-f),f=0,d+=(o.dummy?e:n)/2,d+=(u.dummy?e:n)/2,d+=u.width/2,m(u,"labelpos"))switch(u.labelpos.toLowerCase()){case"l":f=u.width/2;break;case"r":f=-u.width/2;break}return f&&(d+=r?f:-f),f=0,d}}function Rr(n,e){return n.node(e).width}function _r(n){n=bn(n),Tr(n),Kn(Lr(n),function(e,r){n.node(r).x=e})}function Tr(n){var e=V(n),r=n.graph().ranksep,i=0;s(e,function(t){var a=x(w(t,function(o){return n.node(o).height}));s(t,function(o){n.node(o).y=i+a/2}),i+=a+r})}function ii(n,e){var r=Le;r("layout",function(){var i=r("  buildLayoutGraph",function(){return Yr(n)});r("  runLayout",function(){Ir(i,r)}),r("  updateInputGraph",function(){Mr(n,i)})})}function Ir(n,e){e("    makeSpaceForEdgeLabels",function(){Dr(n)}),e("    removeSelfEdges",function(){Jr(n)}),e("    acyclic",function(){be(n)}),e("    nestingGraph.run",function(){ze(n)}),e("    rank",function(){qe(bn(n))}),e("    injectEdgeLabelProxies",function(){$r(n)}),e("    removeEmptyRanks",function(){ye(n)}),e("    nestingGraph.cleanup",function(){He(n)}),e("    normalizeRanks",function(){Ee(n)}),e("    assignRankMinMax",function(){qr(n)}),e("    removeEdgeLabelProxies",function(){Wr(n)}),e("    normalize.run",function(){Me(n)}),e("    parentDummyChains",function(){hr(n)}),e("    addBorderSegments",function(){Ce(n)}),e("    order",function(){sr(n)}),e("    insertSelfEdges",function(){Zr(n)}),e("    adjustCoordinateSystem",function(){Re(n)}),e("    position",function(){_r(n)}),e("    positionSelfEdges",function(){Kr(n)}),e("    removeBorderNodes",function(){Hr(n)}),e("    normalize.undo",function(){Se(n)}),e("    fixupEdgeLabelCoords",function(){Xr(n)}),e("    undoCoordinateSystem",function(){_e(n)}),e("    translateGraph",function(){jr(n)}),e("    assignNodeIntersects",function(){zr(n)}),e("    reversePoints",function(){Ur(n)}),e("    acyclic.undo",function(){ke(n)})}function Mr(n,e){s(n.nodes(),function(r){var i=n.node(r),t=e.node(r);i&&(i.x=t.x,i.y=t.y,e.children(r).length&&(i.width=t.width,i.height=t.height))}),s(n.edges(),function(r){var i=n.edge(r),t=e.edge(r);i.points=t.points,m(t,"x")&&(i.x=t.x,i.y=t.y)}),n.graph().width=e.graph().width,n.graph().height=e.graph().height}var Pr=["nodesep","edgesep","ranksep","marginx","marginy"],Sr={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},Or=["acyclicer","ranker","rankdir","align"],Fr=["width","height"],Vr={width:0,height:0},Br=["minlen","weight","width","height","labeloffset"],Ar={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},Gr=["labelpos"];function Yr(n){var e=new k({multigraph:!0,compound:!0}),r=q(n.graph());return e.setGraph(j({},Sr,$(r,Pr),S(r,Or))),s(n.nodes(),function(i){var t=q(n.node(i));e.setNode(i,Hn($(t,Fr),Vr)),e.setParent(i,n.parent(i))}),s(n.edges(),function(i){var t=q(n.edge(i));e.setEdge(i,j({},Ar,$(t,Br),S(t,Gr)))}),e}function Dr(n){var e=n.graph();e.ranksep/=2,s(n.edges(),function(r){var i=n.edge(r);i.minlen*=2,i.labelpos.toLowerCase()!=="c"&&(e.rankdir==="TB"||e.rankdir==="BT"?i.width+=i.labeloffset:i.height+=i.labeloffset)})}function $r(n){s(n.edges(),function(e){var r=n.edge(e);if(r.width&&r.height){var i=n.node(e.v),t=n.node(e.w),a={rank:(t.rank-i.rank)/2+i.rank,e};C(n,"edge-proxy",a,"_ep")}})}function qr(n){var e=0;s(n.nodes(),function(r){var i=n.node(r);i.borderTop&&(i.minRank=n.node(i.borderTop).rank,i.maxRank=n.node(i.borderBottom).rank,e=x(e,i.maxRank))}),n.graph().maxRank=e}function Wr(n){s(n.nodes(),function(e){var r=n.node(e);r.dummy==="edge-proxy"&&(n.edge(r.e).labelRank=r.rank,n.removeNode(e))})}function jr(n){var e=Number.POSITIVE_INFINITY,r=0,i=Number.POSITIVE_INFINITY,t=0,a=n.graph(),o=a.marginx||0,u=a.marginy||0;function d(f){var c=f.x,h=f.y,l=f.width,v=f.height;e=Math.min(e,c-l/2),r=Math.max(r,c+l/2),i=Math.min(i,h-v/2),t=Math.max(t,h+v/2)}s(n.nodes(),function(f){d(n.node(f))}),s(n.edges(),function(f){var c=n.edge(f);m(c,"x")&&d(c)}),e-=o,i-=u,s(n.nodes(),function(f){var c=n.node(f);c.x-=e,c.y-=i}),s(n.edges(),function(f){var c=n.edge(f);s(c.points,function(h){h.x-=e,h.y-=i}),m(c,"x")&&(c.x-=e),m(c,"y")&&(c.y-=i)}),a.width=r-e+o,a.height=t-i+u}function zr(n){s(n.edges(),function(e){var r=n.edge(e),i=n.node(e.v),t=n.node(e.w),a,o;r.points?(a=r.points[0],o=r.points[r.points.length-1]):(r.points=[],a=t,o=i),r.points.unshift(tn(i,a)),r.points.push(tn(t,o))})}function Xr(n){s(n.edges(),function(e){var r=n.edge(e);if(m(r,"x"))switch((r.labelpos==="l"||r.labelpos==="r")&&(r.width-=r.labeloffset),r.labelpos){case"l":r.x-=r.width/2+r.labeloffset;break;case"r":r.x+=r.width/2+r.labeloffset;break}})}function Ur(n){s(n.edges(),function(e){var r=n.edge(e);r.reversed&&r.points.reverse()})}function Hr(n){s(n.nodes(),function(e){if(n.children(e).length){var r=n.node(e),i=n.node(r.borderTop),t=n.node(r.borderBottom),a=n.node(P(r.borderLeft)),o=n.node(P(r.borderRight));r.width=Math.abs(o.x-a.x),r.height=Math.abs(t.y-i.y),r.x=a.x+r.width/2,r.y=i.y+r.height/2}}),s(n.nodes(),function(e){n.node(e).dummy==="border"&&n.removeNode(e)})}function Jr(n){s(n.edges(),function(e){if(e.v===e.w){var r=n.node(e.v);r.selfEdges||(r.selfEdges=[]),r.selfEdges.push({e,label:n.edge(e)}),n.removeEdge(e)}})}function Zr(n){var e=V(n);s(e,function(r){var i=0;s(r,function(t,a){var o=n.node(t);o.order=a+i,s(o.selfEdges,function(u){C(n,"selfedge",{width:u.label.width,height:u.label.height,rank:o.rank,order:a+ ++i,e:u.e,label:u.label},"_se")}),delete o.selfEdges})})}function Kr(n){s(n.nodes(),function(e){var r=n.node(e);if(r.dummy==="selfedge"){var i=n.node(r.e.v),t=i.x+i.width/2,a=i.y,o=r.x-t,u=i.height/2;n.setEdge(r.e,r.label),n.removeNode(e),r.label.points=[{x:t+2*o/3,y:a-u},{x:t+5*o/6,y:a-u},{x:t+o,y:a},{x:t+5*o/6,y:a+u},{x:t+2*o/3,y:a+u}],r.label.x=r.x,r.label.y=r.y}})}function $(n,e){return F(S(n,e),Number)}function q(n){var e={};return s(n,function(r,i){e[i.toLowerCase()]=r}),e}export{ii as l};
