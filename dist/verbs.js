/* Stable vocabulary IDs. Original vector drawings: large expressive faces,
   bent joints, visible contact with objects, and action-specific motion cues. */
(()=>{
const ink='#333c35',accent='#e5a16f',blue='#86b9c7';
const p=(d,fill='none',stroke=ink,w=4)=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const c=(x,y,r,fill='#fff',stroke=ink,w=4)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
const rect=(x,y,w,h,fill='#fff',r=4)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${ink}" stroke-width="4"/>`;
const group=(s,t)=>`<g transform="${t}">${s}</g>`;
const arrow=d=>p(d,'none','#4a937e',5);
const marks=d=>p(d,'none','#729588',3);
const ground=p('M37 215H283','none','#c8d6c5',3);
function face(x,y,expr='happy',dir=0){let eyes=expr==='sleep'?p('M-17 0Q-10 7-3 0M6 0Q13 7 20 0','none',ink,3):expr==='joy'?p('M-19 2L-11-5L-3 2M6 2L14-5L22 2','none',ink,3):c(-10+dir,0,2.6,ink,ink,1)+c(12+dir,0,2.6,ink,ink,1);let mouth=expr==='open'?p('M2 12Q25 7 24 17Q16 30 6 24Z','#fff',ink,3):expr==='sing'?p('M-10 12H16L5 30Z','#fff',ink,3):expr==='sleep'?p('M-3 18Q3 14 9 18','none',ink,3):p('M-5 15Q5 24 16 14','none',ink,3);return group(c(0,0,32)+eyes+mouth+p('M-22 11L-24 15M-16 12L-18 16','none','#d9a082',2),`translate(${x} ${y})`)}
function fig(o={}){const d={head:[137,61],body:'M119 92Q136 100 153 92L161 148Q139 160 113 148Z',arms:'M119 99L101 135M153 99L174 133',legs:'M122 154L117 199M151 154L157 199',hands:[[101,135],[174,133]],feet:[[109,205],[164,205]],expr:'happy',...o};return p(d.legs)+d.feet.map(([x,y,a=0])=>group(p('M-14 3Q-12-13 0-10Q14-9 17 3Z','#fff'),`translate(${x} ${y}) rotate(${a})`)).join('')+p(d.body,'#fff4e7')+p(d.arms)+face(...d.head,d.expr,d.dir||0)+d.hands.map(([x,y])=>c(x,y,7)).join('')}
const standing=()=>fig();
const seated=()=>fig({head:[132,69],body:'M114 100Q132 108 150 100L154 151Q132 160 110 148Z',arms:'M115 108L126 135L163 141M149 108L163 139',legs:'M118 154H171V200M143 155H184V197',hands:[[163,141]],feet:[[170,206],[190,204]]});
const ball=(x,y,r=18)=>c(x,y,r,'#f2ba82')+p(`M${x-r} ${y}H${x+r}M${x} ${y-r}Q${x-10} ${y} ${x} ${y+r}`,'none',ink,2);
const book=(x,y)=>group(p('M0 0Q25-10 50 2Q75-10 100 0V60Q75 49 50 62Q25 49 0 60Z','#fff')+p('M50 2V62M10 14L37 17M10 25L37 28M63 17L89 14M63 28L89 25','none','#8b9e93',2),`translate(${x} ${y})`);
const table=()=>rect(116,155,160,10,'#d7b48f')+p('M128 165V213M265 165V213');
const shirt=(x,y,s=1)=>group(p('M-17-25L-43-7L-29 11L-19 4V46H26V4L36 11L51-7L24-25Q4-8-17-25Z','#c5dfd8')+p('M-17-25Q3 1 24-25','none',ink,3),`translate(${x} ${y}) scale(${s})`);
const chair=()=>p('M99 105V158H168M107 158V211M161 158V211','none','#91785f',6);
const scenes=[];const add=(word,art,note='')=>scenes.push({word,art,note});
// Mouth contact and a side-facing hand distinguish eating from holding food.
add('たべる',fig({head:[127,66],expr:'open',dir:8,arms:'M110 104L87 138L139 145M151 105L181 114L159 82',hands:[[139,145],[159,82]]})+p('M149 75L167 55Q172 51 178 58L189 78Z','#fff')+rect(163,71,13,12,ink,1)+p('M123 148Q150 175 182 148Z','#fff')+marks('M185 47L192 39M193 58L204 56'),'ごはんを たべる');
add('のむ',fig({head:[127,61],dir:10,expr:'open',arms:'M112 101L90 131M151 101L183 115L180 90',hands:[[90,131],[180,90]]})+group(p('M0 0H37L33 43H4Z','#e4f0f4')+p('M5 19H33','none',blue,3)+p('M37 7Q56 8 49 27L35 29'),`translate(151 92) rotate(-75) scale(.75)`)+marks('M192 43L202 35M198 57L210 53'),'みずを のむ');
add('あるく',ground+fig({head:[147,55],body:'M130 86Q146 94 162 86L159 145Q139 155 119 143Z',arms:'M130 99L102 124L80 112M159 98L176 128L198 137',legs:'M127 149L101 177L71 207M151 151L178 180L204 207',hands:[[80,112],[198,137]],feet:[[62,210],[212,210]]})+marks('M54 223H81M201 223H228'));
add('はしる',ground+fig({head:[171,49],expr:'joy',body:'M143 73L177 82L151 135Q133 142 114 126Z',arms:'M145 85L115 97L98 76M171 93L191 113L219 87',legs:'M123 137L88 162L58 140M145 139L176 158L159 195',hands:[[98,76],[219,87]],feet:[[51,137,-45],[153,201,20]]})+marks('M43 77H95M33 97H80M47 117H87M72 187L85 181')+arrow('M209 176H265M254 165L265 176L254 187'));
add('とぶ',ground+`<ellipse cx="157" cy="211" rx="34" ry="6" fill="#c8d6c5"/>`+fig({head:[150,45],expr:'joy',body:'M130 76Q150 87 169 76L176 127Q151 140 126 128Z',arms:'M130 87L100 69L87 42M170 87L196 66L209 40',legs:'M134 135L109 162L85 143M165 135L191 159L217 140',hands:[[87,42],[209,40]],feet:[[79,140,-35],[224,137,30]]})+arrow('M51 174V100M40 113L51 100L62 113')+marks('M133 185V166M155 190V171M177 183V165'));
add('すわる',chair()+seated()+marks('M173 147H187M92 163L83 174'));
add('たつ',ground+standing()+marks('M103 218H129M151 218H180'),'まっすぐ たつ');
add('ねる',rect(35,151,251,45,'#d5e7e0')+p('M44 196V216M278 196V216')+rect(45,127,64,27)+group(face(0,0,'sleep'),`translate(87 128) rotate(-65)`)+p('M119 126Q179 110 268 136V180H118Z','#c7dde9')+p('M118 127V177','none','#91b1c6',3)+marks('M114 76Q125 63 133 74M132 59Q144 45 152 57'));
add('おきる',rect(34,162,251,34,'#d5e7e0')+p('M43 196V216M278 196V216')+rect(44,145,56,17)+fig({head:[164,65],expr:'joy',body:'M145 96Q165 105 182 96L193 154H132Z',arms:'M146 103L114 85L103 57M181 104L211 79L220 51',legs:'M143 156L123 175M176 158L225 179',hands:[[103,57],[220,51]],feet:[]})+p('M114 158Q172 147 259 163V184H110Z','#c7dde9')+marks('M150 19L146 8M177 19L181 7M203 32L213 24'),'あさ おきる');
add('よむ',fig({head:[147,58],arms:'M125 98L105 134M163 99L196 133',hands:[],legs:'M130 155L119 201M152 155L166 201',feet:[[110,207],[173,207]]})+book(98,111)+c(104,140,7)+c(194,140,7)+p('M130 78L139 96M160 79L153 96','none','#8b9e93',2),'ほんを よむ');
add('かく',table()+fig({head:[100,69],body:'M83 98L118 100L137 156H89Z',arms:'M87 109L112 143L171 145M119 108L151 130L180 130',legs:'M99 159L91 202M123 160L130 200',hands:[[171,145],[180,130]],feet:[[84,208],[137,207]]})+p('M167 140L244 139L258 154H171Z','#fff')+p('M184 131L198 106L204 110L190 136Z','#efbd6a')+p('M188 136L186 144L194 140Z',ink)+p('M205 146H236M209 150H243','none','#7b9086',2),'えんぴつで かく');
add('えがく',p('M207 49L180 214M220 50L261 214','none','#9c8268',5)+rect(177,56,100,108)+p('M186 151L209 124L231 150L254 136L268 153','none','#82a98a',4)+c(246,82,11,'#edc77c','#edc77c')+fig({head:[97,68],body:'M80 99Q98 107 115 98L125 154H77Z',arms:'M82 108L60 141M115 108L145 120L183 99',legs:'M85 158L77 201M111 158L123 201',hands:[[60,141],[183,99]],feet:[[69,208],[130,208]]})+p('M181 100L203 89','none','#a57856',6)+p('M204 89L214 83','none','#79a881',7),'えを えがく');
add('うたう',fig({head:[138,61],expr:'sing',arms:'M121 100L95 118L82 105M156 99L181 119L159 94',hands:[[82,105],[159,94]]})+p('M160 97L154 114','none',ink,8)+c(164,89,11,'#aac8d1')+p('M209 59V29L236 23V53','none',ink,4)+c(201,62,7,accent)+c(228,56,7,accent)+marks('M184 73L194 68M188 87L201 88'));
add('きく',fig({head:[132,65],arms:'M113 104L89 111L100 70M152 104L174 135',hands:[[100,70],[174,135]]})+p('M97 62Q88 72 98 84M101 64Q96 72 101 77','none',ink,3)+rect(217,108,56,75,'#c7ddd5')+c(245,151,17)+c(234,122,3,ink)+p('M222 107V88')+marks('M201 112Q186 125 200 139M188 101Q165 123 185 150'),'おとを きく');
add('みる',group(fig({head:[91,70],body:'M73 100L110 99L119 156H70Z',arms:'M75 109L59 143M107 109L132 142',legs:'M79 159L74 201M105 159L114 201',hands:[[59,143],[132,142]],feet:[[66,208],[121,208]],dir:11}),'translate(0 0)')+rect(177,56,114,88,'#b5cbd0')+rect(185,64,98,72,'#eef4e6')+p('M191 125L215 98L235 124L261 103L278 125','none','#8cae90',3)+c(261,84,10,'#e7c37b','#e7c37b')+p('M218 144V158M202 160H251')+p('M127 67L172 79M128 76L172 95','none','#8caa9b',2),'てれびを みる');
add('はなす',group(fig({expr:'open',dir:8}),'translate(-23 36) scale(.78)')+group(fig({dir:-8}),'translate(154 36) scale(.78)')+p('M112 13H191Q205 13 205 27V55Q205 69 191 69H146L126 86V69H112Q99 69 99 55V27Q99 13 112 13Z','#fff')+c(125,41,3,ink)+c(151,41,3,ink)+c(177,41,3,ink)+marks('M84 104L95 100M87 114H99'),'ともだちと はなす');
add('あらう',rect(171,151,113,22,'#d1e6ea')+p('M182 173L193 214M272 173L262 214')+p('M261 111V85Q261 72 247 72H229V91','none','#829aa1',10)+fig({head:[101,67],body:'M85 98L119 98L132 153H82Z',arms:'M88 109L143 137L206 137M121 111L157 143L219 133',hands:[[206,137],[219,133]],legs:'M91 157L80 201M120 158L132 201',feet:[[72,208],[139,208]]})+p('M228 98V120M235 101V122','none',blue,3)+c(205,126,7,'#fff',blue,2)+c(215,146,6,'#fff',blue,2)+c(226,129,5,'#fff',blue,2),'てを あらう');
add('みがく',fig({head:[139,65],expr:'open',dir:6,arms:'M121 104L99 133M157 104L185 112L167 83',hands:[[99,133],[167,83]]})+p('M151 84H199','none','#78b2a3',7)+p('M151 77H166','none','#fff',7)+p('M151 76V83M157 76V83M163 76V83','none',ink,1.5)+c(149,86,4,'#fff','#9fbdb4',1.5)+c(157,90,4,'#fff','#9fbdb4',1.5)+arrow('M188 63H219M210 55L219 63L210 71'),'はを みがく');
// The garment itself moves over the head: downward to dress, upward to undress.
add('きる',fig({head:[145,61],arms:'M123 103L91 80L99 39M164 103L197 78L186 38',hands:[],expr:'happy'})+shirt(143,72,.92)+face(145,47,'happy')+c(99,39,7)+c(186,38,7)+arrow('M243 49V145M231 132L243 145L255 132')+marks('M89 103L80 118M202 102L211 117'),'ふくを きる');
add('ぬぐ',fig({head:[145,61],arms:'M123 103L94 81L104 42M164 103L199 80L187 40',hands:[]})+shirt(143,24,.92)+p('M124 63Q145 73 167 62','none',ink,3)+c(104,42,7)+c(187,40,7)+arrow('M243 147V49M231 62L243 49L255 62')+marks('M85 57L78 43M209 57L218 43'),'ふくを ぬぐ');
// Same door and actor; open gap + swing arrow versus flush door + closing hand.
add('あける',rect(179,29,100,181,'#d2e5df')+p('M180 30L234 56V190L180 211Z','#e9ca9d')+c(224,127,4,ink)+fig({head:[96,70],body:'M79 100L114 100L122 157H73Z',arms:'M82 111L64 141M112 111L161 134L219 128',hands:[[64,141],[219,128]],legs:'M82 160L68 201M110 160L126 201',feet:[[60,208],[133,208]]})+arrow('M272 105Q273 159 242 173M244 159L242 173L256 171'),'どあを あける');
add('しめる',rect(179,29,100,181,'#d2e5df')+rect(185,35,88,169,'#e9ca9d')+c(259,126,4,ink)+fig({head:[100,68],body:'M82 98L119 98L129 155H79Z',arms:'M86 110L63 142M119 108L167 121L213 120',hands:[[63,142],[213,120]],legs:'M88 158L72 202M118 159L137 201',feet:[[64,208],[145,208]]})+arrow('M217 82H260M248 71L260 82L248 93')+marks('M281 113L295 107M282 131H299M280 147L294 155'),'どあを しめる');
add('おす',ground+rect(200,120,77,88,'#e5c49d')+p('M208 126L238 140L268 127M238 141V200','none','#b39a7a',2)+fig({head:[155,65],body:'M129 87L165 94L141 153L110 137Z',arms:'M136 101L168 125L198 125M157 108L175 147L198 145',hands:[[198,125],[198,145]],legs:'M117 145L90 171L64 205M137 156L148 181L177 205',feet:[[56,210],[184,210]],expr:'open'})+arrow('M207 87H274M261 76L274 87L261 98'));
add('ひく',ground+rect(35,124,71,83,'#e5c49d')+p('M42 131L69 143L98 132M69 143V199','none','#b39a7a',2)+p('M105 159L180 124','none','#997f5f',5)+fig({head:[215,62],body:'M195 91L228 94L232 150L199 151Z',arms:'M198 104L177 123M225 105L201 139L181 130',hands:[[177,123],[181,130]],legs:'M206 156L180 184L167 205M227 155L245 182L266 204',feet:[[159,211],[273,210]],expr:'open'})+arrow('M39 90H105M92 79L105 90L92 101'));
add('なげる',fig({head:[128,65],body:'M108 94L143 96L155 150H113Z',arms:'M111 105L83 88L94 62M144 106L179 83L203 58',hands:[[94,62],[203,58]],legs:'M120 154L96 200M145 155L184 200',feet:[[88,207],[191,207]],expr:'joy'})+ball(249,40,18)+arrow('M207 43Q232 10 277 34M267 22L277 34L261 36')+marks('M215 60L230 54M219 69L236 61'));
add('うけとる',fig({head:[109,62],body:'M92 94L127 94L139 152H89Z',arms:'M96 105L134 131L183 106M128 106L154 146L192 129',hands:[[183,106],[192,129]],legs:'M100 157L87 200M128 157L153 200',feet:[[79,207],[161,207]]})+ball(202,103,20)+arrow('M281 52Q246 59 228 83M240 79L228 83L232 69')+marks('M179 88L170 78M205 135L209 148'));
add('ける',ground+fig({head:[123,58],body:'M105 89L139 91L157 142L121 155Z',arms:'M108 100L82 126L63 108M140 102L171 115L187 95',hands:[[63,108],[187,95]],legs:'M126 156L115 180L105 202M150 150L185 170L219 143',feet:[[97,209],[225,139,-25]]})+ball(266,121,20)+arrow('M247 90L282 61M267 63L282 61L278 76')+marks('M225 165L239 150M232 176L249 156'));
add('およぐ',p('M35 149Q62 105 119 135L203 139L186 162H70Z','#fff4e7')+p('M99 138L142 99L194 78M126 148L169 172L210 151M65 140L43 113L22 128')+c(194,78,7)+c(210,151,7)+face(231,118,'happy',8)+p('M15 167Q33 151 51 167T87 167T123 167T159 167T195 167T231 167T267 167T303 167','none',blue,6)+p('M20 196Q38 180 56 196T92 196T128 196T164 196T200 196T236 196T272 196','none','#b8d8e0',4)+marks('M179 61L173 48M196 60L203 44M51 105L46 92M31 106L19 99'));
add('のる',c(79,176,36)+c(250,176,36)+p('M79 176L128 176L105 126L79 176L169 126L128 176M169 126L250 176L219 100H236','none','#6b9f8d',5)+p('M95 122H120M128 176L151 179')+fig({head:[152,48],body:'M134 79L168 81L181 116L135 132Z',arms:'M138 90L176 110L218 107M167 87L186 100L219 107',hands:[[219,107]],legs:'M142 133L175 151L151 178M160 130L124 150L130 174',feet:[[151,181],[129,179]]}),'じてんしゃに のる');
add('あそぶ',fig({head:[102,71],body:'M85 102L120 102L133 151L86 157Z',arms:'M91 111L130 144L179 126M119 112L152 122L177 124',hands:[[179,126]],legs:'M96 160L68 188L109 200M122 158L149 191L120 202',feet:[[115,204],[122,206]],expr:'joy'})+rect(184,164,35,37,'#c4dfd5')+rect(223,164,35,37,'#e9bd8a')+rect(202,125,35,36,'#a9c9d8')+group(rect(0,0,30,30,'#e9bd8a'),'translate(173 96) rotate(-15)')+marks('M218 109L226 99M239 121L250 117'),'つみきで あそぶ');
// Two-panel timelines. The pictures carry no written answer; 1→2 indicates order.
const pair=(before,after)=>({sequence:true,viewBox:'0 0 680 270',art:`<rect x="3" y="3" width="314" height="264" rx="18" fill="#fff" stroke="#d8e1d2" stroke-width="2"/><rect x="363" y="3" width="314" height="264" rx="18" fill="#fff" stroke="#d8e1d2" stroke-width="2"/>${group(before,'translate(10 39) scale(.92)')}${group(after,'translate(370 39) scale(.92)')}<circle cx="25" cy="24" r="15" fill="#edf3e7"/><circle cx="385" cy="24" r="15" fill="#edf3e7"/><text x="25" y="30" text-anchor="middle" font-size="18" font-family="sans-serif" font-weight="bold" fill="${ink}">1</text><text x="385" y="30" text-anchor="middle" font-size="18" font-family="sans-serif" font-weight="bold" fill="${ink}">2</text>${arrow('M328 135H351M342 125L352 135L342 145')}`});
const timeline=(word,before,after)=>Object.assign(scenes.find(s=>s.word===word),pair(before,after));
const addPair=(word,before,after,note)=>{add(word,'',note);Object.assign(scenes[scenes.length-1],pair(before,after))};
const original=word=>scenes.find(s=>s.word===word).art;
const actor=(pose='stand',dx=0)=>group(fig(pose==='reach'?{head:[89,61],body:'M72 92L107 92L116 148Q91 160 68 148Z',arms:'M76 105L122 127L161 121M106 104L133 140L162 133',hands:[[161,121],[162,133]],legs:'M77 154L68 200M104 154L114 200',feet:[[60,207],[121,207]]}:pose==='bend'?{head:[137,100],body:'M111 113L143 127L110 164L77 146Z',arms:'M119 127L158 164L181 185M136 134L169 171L187 183',hands:[[181,185],[187,183]],legs:'M84 153L63 178L57 202M107 166L117 190L136 202',feet:[[49,209],[144,209]]}:{head:[89,61],body:'M72 92L107 92L116 148Q91 160 68 148Z',arms:'M75 103L55 137M107 103L128 136',hands:[[55,137],[128,136]],legs:'M77 154L68 200M104 154L114 200',feet:[[60,207],[121,207]]}),`translate(${dx} 0)`);
const crate=(x,y,w=65)=>rect(x,y,w,54,'#e5c49d')+p(`M${x+4} ${y+4}L${x+w/2} ${y+17}L${x+w-4} ${y+4}M${x+w/2} ${y+17}V${y+48}`,'none','#a98c68',2);
const paper=(x,y,a=0)=>group(rect(0,0,48,60)+p('M9 15H39M9 26H39M9 37H30','none','#a8b4ac',2),`translate(${x} ${y}) rotate(${a})`);
const tray=()=>p('M170 146L193 122H276L295 146V194H170Z','#e7c9a3')+p('M170 146H295M193 122V145','none','#9a846c',3);
const basket=()=>p('M187 125H277L267 205H197Z','#d6e4db')+p('M205 133V195M220 133V195M237 133V195M253 133V195','none','#9fb4a6',2);
const desk=()=>rect(153,153,145,10,'#d6b28f')+p('M165 165V216M285 165V216');
const clothed=()=>fig()+shirt(135,111,.6);
const bareWithShirt=()=>fig({arms:'M119 99L103 134L184 139M153 99L173 123L199 140',hands:[[184,139],[199,140]]})+shirt(197,155,.52);
timeline('きる',bareWithShirt(),clothed());
timeline('ぬぐ',clothed(),bareWithShirt());
const door=(open)=>rect(177,27,107,185,'#d7e7df')+(open?p('M284 28L234 56V189L284 211Z','#e9ca9d')+c(244,128,4,ink):rect(183,33,95,173,'#e9ca9d')+c(200,128,4,ink));
timeline('あける',door(false)+actor('reach',40),door(true)+actor('reach',80));
timeline('しめる',door(true)+actor('reach',80),door(false)+actor('reach',40));

const push=(shift)=>ground+group(fig({head:[135,65],body:'M112 94L149 99L129 153L94 140Z',arms:'M118 108L144 137L168 166M144 108L157 150L168 183',hands:[[168,166],[168,183]],legs:'M104 147L82 177L59 205M126 154L140 181L159 204',feet:[[51,210],[166,210]]})+crate(168,150),'translate('+shift+' 0)')+p('M25 220V211M290 220V211','none','#8c9a90',2);

timeline('おす',push(-14),push(34));
const pull=(shift)=>ground+group(crate(22,151)+actor('reach',102)+p('M87 174L166 125','none','#9a846c',4),'translate('+shift+' 0)')+p('M25 220V211M290 220V211','none','#8c9a90',2);
// The pulling person is on the right, leaning away, with hands on the taut rope.
const pulling=(shift)=>ground+group(crate(21,151)+fig({head:[214,63],body:'M193 93L228 92L236 149L202 152Z',arms:'M198 105L172 126M228 103L204 142L173 134',hands:[[172,126],[173,134]],legs:'M208 156L183 182L168 204M229 155L250 183L266 203',feet:[[160,210],[274,210]]})+p('M87 170L172 130','none','#9a846c',4),`translate(${shift} 0)`);
timeline('ひく',pulling(-12),pulling(18));
const heldBall=()=>fig({arms:'M121 102L149 126L178 107M155 102L180 132L194 113',hands:[[178,107],[194,113]]})+ball(195,96,18);
timeline('なげる',heldBall(),original('なげる'));
timeline('うけとる',actor('reach')+ball(260,100,18),actor('reach')+ball(174,116,18));
timeline('ける',ground+fig()+ball(214,199,18),original('ける'));
timeline('すわる',chair()+group(fig(),'translate(-31 0)'),chair()+seated());
timeline('たつ',chair()+seated(),chair()+group(fig(),'translate(33 0)'));
timeline('おきる',original('ねる'),original('おきる'));
// Three children face the same direction and keep personal space in a line.
const mini=(x,highlight=false)=>group(fig(),`translate(${x} 65) scale(.65)`);
addPair('ならぶ',mini(-50)+mini(100)+group(fig(),'translate(63 24) scale(.65)')+marks('M154 169L174 181'),mini(-50)+mini(27)+mini(104),'じゅんばんに ならぶ');
const papersDesk=(count)=>desk()+Array.from({length:count},(_,i)=>paper(175+i*9,116-i*3)).join('');
const recipient=()=>group(seated(),'translate(184 84) scale(.55)');
const giving=(papers)=>actor('reach')+recipient()+paper(159,111,-12)+(papers?paper(116,151,-12):'');
const distributing=(after)=>group(fig({arms:'M119 99L146 124L192 119M153 99L176 134L192 124',hands:[[192,119],[192,124]]}),'translate(8 -10) scale(.5)')+Array.from({length:after?2:5},(_,i)=>group(paper(0,0),`translate(${107+i*2} ${38+i*2}) scale(.42)`)).join('')+[0,100,200].map(x=>group(seated(),`translate(${x} 103) scale(.45)`)+rect(x+25,177,64,7,'#d6b28f')+p(`M${x+30} 184V213M${x+83} 184V213`)+(after?rect(x+40,168,33,8):'')).join('');
addPair('くばる',distributing(false),distributing(true),'ぷりんとを みんなに くばる');

const shelf=()=>rect(171,84,126,125,'#e6dbc7')+p('M175 147H293','none',ink,4);
const looseBooks=()=>book(168,154)+paper(122,173,25);
const tidyBooks=()=>rect(187,98,15,46,'#c7ddd4')+rect(205,100,15,44,'#e8be8d')+rect(223,94,16,50,'#aac8d5');
addPair('かたづける',shelf()+actor()+looseBooks(),shelf()+tidyBooks()+actor('reach'),'つかった ほんを かたづける');
const carry=(dx,walking=false)=>ground+group((walking?fig({head:[89,61],body:'M72 92L107 92L116 148Q91 160 68 148Z',arms:'M76 105L122 127L161 121M106 104L133 140L162 133',hands:[[161,121],[162,133]],legs:'M77 154L55 182L32 204M104 154L126 179L150 204',feet:[[24,210],[158,210]]}):actor('reach'))+crate(154,117),`translate(${dx} 0)`)+p('M20 220V213M290 220V213','none','#8c9a90',2);

addPair('はこぶ',carry(-25),carry(42,true)+marks('M102 217H119M147 217H164'),'はこを べつの ばしょへ はこぶ');
add('もつ',actor('reach')+crate(154,117)+ground,'はこを もつ');
addPair('おく',desk()+actor('reach')+paper(161,100),desk()+actor()+rect(209,144,66,8)+p('M213 147H270','none','#b1beb4',2),'ほんを つくえに おく');
addPair('いれる',tray()+actor('reach')+ball(178,103,19),tray()+ball(229,147,19)+p('M172 161H293V192H172Z','#e7c9a3','none',0)+actor(),'ぼーるを はこに いれる');
addPair('だす',tray()+ball(229,147,19)+p('M172 161H293V192H172Z','#e7c9a3','none',0)+actor(),tray()+actor('reach')+ball(178,103,19),'ぼーるを はこから だす');
const card=(x,y)=>rect(x,y,35,25,'#d5e4d9')+p(`M${x+7} ${y+8}H${x+28}`,'none','#97ae9e',2);
addPair('あつめる',desk()+actor('reach')+card(175,123)+card(225,123)+card(270,123),desk()+actor('reach')+card(158,105)+card(161,101)+card(164,97),'ぷりんとを あつめる');
const twoPeople=(transfer)=>group(fig({arms:'M121 102L160 126L210 120M153 102L184 131L211 125',hands:[]}), 'translate(-57 59) scale(.7)')+group(fig({arms:'M119 99L81 127L35 121M153 99L119 135L36 126',hands:[]}), 'translate(154 59) scale(.7)')+paper(transfer?178:90,135,-7);
addPair('わたす',twoPeople(false),twoPeople(true),'ほんを ともだちに わたす');
addPair('ひろう',actor()+ground+paper(192,178,10),actor('bend')+ground+paper(183,146,8),'おちた かみを ひろう');
addPair('すてる',basket()+actor('reach')+p('M171 106L185 100L197 110L190 122L174 119Z','#fff'),basket()+actor()+p('M222 164L236 158L248 168L241 180L225 177Z','#fff'),'ごみを ごみばこに すてる');
const wipedDesk=(dirty)=>desk()+actor('reach')+p('M164 140L191 141L198 152H166Z','#c9ddd1')+(dirty?p('M207 147L219 143M233 145L241 149M262 144L273 147','none','#8e795e',4):marks('M231 125V139M224 132H238M264 135V147M258 141H270'));
addPair('ふく',wipedDesk(true),wipedDesk(false),'ぞうきんで つくえを ふく');
const board=()=>rect(170,37,127,153,'#d7e5d9');
addPair('はる',board()+actor('reach')+paper(136,116),board()+paper(207,86)+actor('reach'),'かみを かべに はる');
addPair('おる',desk()+actor('reach')+rect(184,93,80,56,'#e6c499'),desk()+actor('reach')+p('M184 149L264 93V149Z','#e6c499')+p('M184 149L264 93','none','#b09069',3),'かみを はんぶんに おる');
addPair('ならべる',desk()+actor('reach')+rect(169,129,29,23,'#c6dcd3')+rect(211,106,23,45,'#e3b78a')+group(rect(0,0,27,30,'#a7c8d4'),'translate(255 123) rotate(18)'),desk()+actor('reach')+rect(166,119,29,32,'#c6dcd3')+rect(211,119,29,32,'#e3b78a')+rect(256,119,29,32,'#a7c8d4'),'ものを いちれつに ならべる');
const clock=(late)=>c(252,57,29)+p(late?'M252 57L252 38M252 57L271 57':'M252 57L252 38M252 57L240 72','none',ink,3)+c(252,57,2,ink);
addPair('まつ',actor()+clock(false)+rect(190,94,103,116,'#e2e9dc')+c(277,153,4,ink),actor()+clock(true)+rect(190,94,103,116,'#e2e9dc')+c(277,153,4,ink),'じゅんばんが くるまで まつ');
const deskSmall=()=>rect(80,155,172,10,'#d7b895')+p('M93 167V214M239 167V214');
const raised=()=>fig({head:[132,69],body:'M114 100Q132 108 150 100L154 151Q132 160 110 148Z',arms:'M115 108L126 135L163 141M149 108L180 73L180 22',hands:[[163,141],[180,22]],legs:'M118 154H171V200M143 155H184V197',feet:[[170,206],[190,204]]});
addPair('てをあげる',deskSmall()+seated(),deskSmall()+raised(),'はっぴょうするとき てを あげる');
const bowed=()=>fig({head:[182,103],body:'M129 100L166 116L132 157L103 140Z',arms:'M136 111L151 142L175 158M155 121L170 147L181 157',hands:[[175,158],[181,157]],legs:'M115 150L109 200M135 155L146 200',feet:[[101,208],[153,208]]});
addPair('おじぎをする',ground+fig(),ground+bowed(),'あいてに むかって おじぎを する');
const scissors=(closed)=>c(164,124,10)+c(166,149,10)+p(closed?'M171 132L222 121M174 142L222 121':'M171 132L220 105M174 142L226 157','none',ink,4);
addPair('かみをきる',desk()+actor('reach')+rect(202,100,64,51,'#e4c39c')+scissors(false),desk()+actor('reach')+p('M202 100H234V151H202Z','#e4c39c')+p('M249 110H272V155H249Z','#e4c39c')+scissors(true),'はさみで かみを きる');

window.VERBS=scenes.map((s,i)=>({id:'v'+String(i+1).padStart(3,'0'),word:s.word,g:'うごき',note:s.note,sequence:!!s.sequence,art:`<svg viewBox="${s.viewBox||'0 0 320 240'}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s.art}</svg>`}));
})();
