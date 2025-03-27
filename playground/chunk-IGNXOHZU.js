import{Ca as p,Ia as h,Ja as c,Ka as y,La as I,Na as t,Oa as e,Pa as l,Qa as C,Ra as _,Sa as g,V as u,W as v,Ya as n,Za as x,_a as f,ab as w,qa as a,rb as E,sb as z,ub as S,za as b}from"./chunk-FD2WYKST.js";var k=(()=>{class o{name="home";size="md";color="text-gray-500";get sizePx(){let i={sm:16,md:24,lg:32,xl:48};return i[this.size]||i.md}get colorClass(){return this.color}static \u0275fac=function(m){return new(m||o)};static \u0275cmp=b({type:o,selectors:[["lib-icon"]],inputs:{name:"name",size:"size",color:"color"},decls:2,vars:4,consts:[[1,"material-icons",3,"ngClass"]],template:function(m,r){m&1&&(t(0,"span",0),n(1),e()),m&2&&(y("font-size",r.sizePx,"px"),c("ngClass",r.colorClass),a(),f(" ",r.name,`
`))},dependencies:[S,E],styles:[".material-icons[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle}"]})}return o})();var T=o=>({"animate-spin":o});function O(o,s){if(o&1&&(t(0,"div",13)(1,"span",14),n(2),e(),l(3,"lib-icon",56),e()),o&2){let i=s.$implicit;a(2),x(i.name),a(),c("color",i.class)}}function M(o,s){if(o&1&&(t(0,"div",57),l(1,"lib-icon",58),t(2,"span",59),n(3),e()()),o&2){let i=s.$implicit;a(),c("name",i),a(2),x(i)}}function V(o,s){if(o&1&&(t(0,"div",57),l(1,"lib-icon",58),t(2,"span",59),n(3),e()()),o&2){let i=s.$implicit;a(),c("name",i),a(2),x(i)}}function $(o,s){if(o&1&&(t(0,"div",28)(1,"h3",6),n(2),e(),t(3,"div",60),p(4,V,4,2,"div",22),e()()),o&2){let i=s.$implicit;a(2),x(i.name),a(2),c("ngForOf",i.icons)}}function A(o,s){if(o&1){let i=C();t(0,"button",61),_("click",function(){let r=u(i).$implicit,d=g();return v(d.selectIcon(r))})("keydown.enter",function(){let r=u(i).$implicit,d=g();return v(d.selectIcon(r))})("keydown.space",function(r){let d=u(i).$implicit;return g().selectIcon(d),v(r.preventDefault())}),l(1,"lib-icon",58),t(2,"span",62),n(3),e()()}if(o&2){let i=s.$implicit,m=g();I("bg-blue-100",m.selectedIcon===i),h("aria-pressed",m.selectedIcon===i),a(),c("name",i),a(2),x(i)}}var U=(()=>{class o{selectedIcon="home";animatedIcon=!1;commonIcons=["home","search","favorite","settings","person","mail","notifications","menu","close","check","star","delete","edit","add","remove"];iconCategories=[{name:"Navigation",icons:["home","menu","arrow_back","arrow_forward","expand_more","expand_less","more_vert"]},{name:"Actions",icons:["search","settings","edit","delete","add","remove","check","close"]},{name:"Communication",icons:["mail","message","chat","phone","email","contacts"]},{name:"Status",icons:["error","warning","info","help","check_circle","done"]}];colorOptions=[{name:"Default",class:"text-gray-500"},{name:"Primary",class:"text-blue-600"},{name:"Success",class:"text-green-600"},{name:"Warning",class:"text-yellow-500"},{name:"Danger",class:"text-red-600"},{name:"Info",class:"text-purple-600"}];toggleAnimation(){this.animatedIcon=!this.animatedIcon}selectIcon(i){this.selectedIcon=i}static \u0275fac=function(m){return new(m||o)};static \u0275cmp=b({type:o,selectors:[["app-icon-demo"]],decls:146,vars:10,consts:[[1,"p-8","max-w-6xl","mx-auto"],[1,"text-3xl","font-bold","mb-8"],[1,"mb-12"],[1,"text-2xl","font-semibold","mb-4","pb-2","border-b"],[1,"grid","grid-cols-1","md:grid-cols-4","gap-6"],[1,"flex","flex-col","gap-2","items-center"],[1,"text-lg","font-medium"],["name","home"],["name","star"],["name","favorite","color","text-red-600"],[1,"flex","items-center","gap-2"],["name","settings"],[1,"flex","flex-wrap","items-center","justify-center","gap-8"],[1,"flex","flex-col","items-center","gap-2"],[1,"text-sm","text-gray-600"],["name","search","size","sm"],["name","search","size","md"],["name","search","size","lg"],["name","search","size","xl"],[1,"grid","grid-cols-2","md:grid-cols-6","gap-6"],["class","flex flex-col items-center gap-2",4,"ngFor","ngForOf"],[1,"grid","grid-cols-3","sm:grid-cols-5","md:grid-cols-7","lg:grid-cols-10","gap-6"],["class","flex flex-col items-center gap-1",4,"ngFor","ngForOf"],[1,"flex","flex-col","gap-8"],["class","flex flex-col gap-4",4,"ngFor","ngForOf"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-8"],[1,"p-4","border","rounded-lg"],[1,"text-lg","font-medium","mb-3"],[1,"flex","flex-col","gap-4"],[1,"text-gray-600"],[1,"grid","grid-cols-5","gap-4"],["class","p-2 border rounded-md cursor-pointer hover:bg-gray-100 flex flex-col items-center gap-1","tabindex","0","role","button",3,"bg-blue-100","click","keydown.enter","keydown.space",4,"ngFor","ngForOf"],[1,"mt-4","p-4","border","rounded-md","bg-gray-50","flex","items-center","justify-center"],["size","xl","color","text-blue-600",3,"name"],[1,"text-sm"],[1,"flex","justify-center"],["name","sync","size","xl","color","text-blue-600",3,"ngClass"],[1,"flex","justify-center","mt-4"],[1,"px-4","py-2","bg-blue-600","text-white","rounded-md","hover:bg-blue-700","transition-colors",3,"click"],[1,"grid","grid-cols-1","md:grid-cols-3","gap-6"],["name","cloud","size","xl","color","text-blue-500",1,"filter","drop-shadow-lg"],["name","visibility","size","xl","color","text-purple-600",1,"opacity-50"],["name","refresh","size","xl","color","text-green-600",1,"transform","rotate-45"],["name","favorite","size","xl","color","text-gray-400",1,"hover:text-red-600","transition-colors"],["name","notifications","size","xl","color","text-yellow-500",1,"animate-pulse"],["name","star","size","xl",1,"text-transparent","bg-clip-text","bg-gradient-to-r","from-blue-500","to-purple-600"],[1,"px-4","py-2","bg-blue-600","text-white","rounded-md","hover:bg-blue-700","flex","items-center","gap-2"],["name","save","color","text-white"],[1,"relative"],[1,"absolute","inset-y-0","left-0","pl-3","flex","items-center","pointer-events-none"],["name","search","color","text-gray-400"],["type","text","placeholder","Search...",1,"pl-10","pr-3","py-2","w-full","border","rounded-md"],[1,"p-4","border","rounded-md","bg-gray-50"],[1,"flex","items-start","gap-3"],["name","info","color","text-blue-600","size","lg"],[1,"font-medium"],["name","star",3,"color"],[1,"flex","flex-col","items-center","gap-1"],[3,"name"],[1,"text-xs","text-gray-600"],[1,"grid","grid-cols-3","sm:grid-cols-4","md:grid-cols-7","gap-6"],["tabindex","0","role","button",1,"p-2","border","rounded-md","cursor-pointer","hover:bg-gray-100","flex","flex-col","items-center","gap-1",3,"click","keydown.enter","keydown.space"],[1,"text-xs"]],template:function(m,r){m&1&&(t(0,"div",0)(1,"h1",1),n(2,"Icon Component Showcase"),e(),t(3,"section",2)(4,"h2",3),n(5,"Basic Usage"),e(),t(6,"div",4)(7,"div",5)(8,"h3",6),n(9,"Default"),e(),l(10,"lib-icon",7),e(),t(11,"div",5)(12,"h3",6),n(13,"Custom Icon"),e(),l(14,"lib-icon",8),e(),t(15,"div",5)(16,"h3",6),n(17,"Colored Icon"),e(),l(18,"lib-icon",9),e(),t(19,"div",5)(20,"h3",6),n(21,"With Text"),e(),t(22,"div",10),l(23,"lib-icon",11),t(24,"span"),n(25,"Settings"),e()()()()(),t(26,"section",2)(27,"h2",3),n(28,"Size Variations"),e(),t(29,"div",12)(30,"div",13)(31,"span",14),n(32,"Small"),e(),l(33,"lib-icon",15),e(),t(34,"div",13)(35,"span",14),n(36,"Medium (Default)"),e(),l(37,"lib-icon",16),e(),t(38,"div",13)(39,"span",14),n(40,"Large"),e(),l(41,"lib-icon",17),e(),t(42,"div",13)(43,"span",14),n(44,"Extra Large"),e(),l(45,"lib-icon",18),e()()(),t(46,"section",2)(47,"h2",3),n(48,"Color Variations"),e(),t(49,"div",19),p(50,O,4,2,"div",20),e()(),t(51,"section",2)(52,"h2",3),n(53,"Common Icons"),e(),t(54,"div",21),p(55,M,4,2,"div",22),e()(),t(56,"section",2)(57,"h2",3),n(58,"Icon Categories"),e(),t(59,"div",23),p(60,$,5,2,"div",24),e()(),t(61,"section",2)(62,"h2",3),n(63,"Interactive Example"),e(),t(64,"div",25)(65,"div",26)(66,"h3",27),n(67,"Icon Selector"),e(),t(68,"div",28)(69,"p",29),n(70,"Click on an icon to select it:"),e(),t(71,"div",30),p(72,A,4,5,"button",31),e(),t(73,"div",32)(74,"div",13),l(75,"lib-icon",33),t(76,"span",34),n(77),e()()()()(),t(78,"div",26)(79,"h3",27),n(80,"Animation Example"),e(),t(81,"div",28)(82,"p",29),n(83,"Toggle animation:"),e(),t(84,"div",35),l(85,"lib-icon",36),e(),t(86,"div",37)(87,"button",38),_("click",function(){return r.toggleAnimation()}),n(88),e()()()()()(),t(89,"section",2)(90,"h2",3),n(91,"Custom Styling Examples"),e(),t(92,"div",39)(93,"div",13)(94,"span",14),n(95,"Shadow Effect"),e(),l(96,"lib-icon",40),e(),t(97,"div",13)(98,"span",14),n(99,"Opacity Effect"),e(),l(100,"lib-icon",41),e(),t(101,"div",13)(102,"span",14),n(103,"Transform Effect"),e(),l(104,"lib-icon",42),e(),t(105,"div",13)(106,"span",14),n(107,"Hover Effect"),e(),l(108,"lib-icon",43),e(),t(109,"div",13)(110,"span",14),n(111,"Pulse Animation"),e(),l(112,"lib-icon",44),e(),t(113,"div",13)(114,"span",14),n(115,"Gradient Text"),e(),l(116,"lib-icon",45),e()()(),t(117,"section",2)(118,"h2",3),n(119,"Icons in UI Components"),e(),t(120,"div",39)(121,"div",26)(122,"h3",27),n(123,"Button with Icon"),e(),t(124,"button",46),l(125,"lib-icon",47),t(126,"span"),n(127,"Save Changes"),e()()(),t(128,"div",26)(129,"h3",27),n(130,"Input with Icon"),e(),t(131,"div",48)(132,"div",49),l(133,"lib-icon",50),e(),l(134,"input",51),e()(),t(135,"div",26)(136,"h3",27),n(137,"Card with Icon"),e(),t(138,"div",52)(139,"div",53),l(140,"lib-icon",54),t(141,"div")(142,"h4",55),n(143,"Information"),e(),t(144,"p",14),n(145,"This is an example of using icon in a card layout."),e()()()()()()()()),m&2&&(a(50),c("ngForOf",r.colorOptions),a(5),c("ngForOf",r.commonIcons),a(5),c("ngForOf",r.iconCategories),a(12),c("ngForOf",r.commonIcons.slice(0,10)),a(3),c("name",r.selectedIcon),a(2),f("Selected: ",r.selectedIcon,""),a(8),c("ngClass",w(8,T,r.animatedIcon)),a(3),f(" ",r.animatedIcon?"Stop Animation":"Start Animation"," "))},dependencies:[S,E,z,k],encapsulation:2})}return o})();export{U as IconDemoComponent};
