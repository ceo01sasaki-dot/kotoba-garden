const fs=require('fs'),vm=require('vm'),assert=require('assert');
const nodes={};const node=()=>({innerHTML:'',dataset:{},classList:{add(){},remove(){}},showModal(){this.open=true},close(){this.open=false}});
const writes={};const c={window:{scrollTo(){}},document:{querySelector:s=>nodes[s]||(nodes[s]=node()),addEventListener(){}},localStorage:{getItem(){return null},setItem(k,v){writes[k]=v}},setTimeout(){},clearTimeout(){},console};vm.createContext(c);for(const f of ['verbs.js','nouns.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);c.VERBS=c.window.VERBS;c.NOUNS=c.window.NOUNS;vm.runInContext(fs.readFileSync('dist/app.js','utf8'),c);
assert.equal(c.VERBS.length,100);assert.equal(c.NOUNS.length,300);
for(const [kind,items,rounds,repeats]of [['verb',c.VERBS,30,3],['noun',c.NOUNS,60,2]]){assert.equal(new Set(items.map(x=>x.word)).size,items.length);assert(items.every(x=>/^[ぁ-ゖー]+$/.test(x.word)));let counts={};for(let r=0;r<rounds;r++){const qs=c.makeQuestions(kind,r);assert.equal(qs.length,10);assert.equal(qs.filter(q=>q.direction==='picture').length,5);for(const q of qs){assert.equal(q.options.length,4);assert(q.options.filter(x=>x.id!==q.target.id).every(x=>c.isCompatible(q.target,x,kind)));if(kind==='verb')assert(q.options.every(x=>!!x.sequence===!!q.target.sequence));assert.equal(new Set(q.options.map(x=>x.word)).size,4);assert.equal(new Set(q.options.map(x=>x.art||x.emoji)).size,4);assert.equal(q.options.filter(x=>x.id===q.target.id).length,1);counts[q.target.id]=(counts[q.target.id]||0)+1}}assert(Object.values(counts).every(x=>x===repeats));}
vm.runInContext("start(0); for(let i=0;i<10;i++){answer(state.questions[i].target.id);answer('bad');next()} if(state.page!=='result'||saved.scores['verb-0'].best!==10||state.answers.length!==10)throw Error('quiz result failed'); start(0); for(let i=0;i<10;i++){answer(state.questions[i].options.find(x=>x.id!==state.questions[i].target.id).id);next()} if(saved.scores['verb-0'].best!==10||saved.scores['verb-0'].last!==0)throw Error('best score failed'); const missed=state.questions.filter((q,i)=>!state.answers[i].correct); start(0,missed);if(!state.review||state.questions.length!==10)throw Error('review failed');",c);
console.log('PASS: 400 unique words; 900 questions; 4 distinct choices; balanced directions; full coverage; scoring, double-answer lock, best-score preservation and review.');
// A vocabulary change must not relabel an old score as a result for a new course.
const legacy={scores:{'verb-0':{best:9,last:8,attempts:2},'noun-0':{best:7,last:7,attempts:1},'noun-25':{best:8,last:8,attempts:1}}};
const oldContext={...c,window:{scrollTo(){}},localStorage:{getItem(){return JSON.stringify(legacy)},setItem(){}}};
vm.createContext(oldContext);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),oldContext);
assert.equal(vm.runInContext("saved.previousVerbScores['verb-0'].best",oldContext),9);
assert.equal(vm.runInContext("done('verb')",oldContext),0);
assert.equal(vm.runInContext("saved.previousNounScores['noun-0'].best",oldContext),7);
assert.equal(vm.runInContext("done('noun')",oldContext),0);
console.log('PASS: earlier verb results archived; reorganized noun results archived.');

assert.equal(vm.runInContext("saved.previousNounScores['noun-25'].best",oldContext),8);
assert.equal(vm.runInContext("saved.scores['noun-25']",oldContext),undefined);
console.log('PASS: changed noun courses archived without losing scores.');

// Every noun course and every distractor stays inside one category.
for(let r=0;r<60;r++){const qs=c.makeQuestions('noun',r);assert.equal(new Set(qs.map(q=>q.target.g)).size,1);for(const q of qs)assert(q.options.every(w=>w.g===q.target.g));}
assert.equal(c.VERBS.filter(w=>w.word==='たたく').length,1);
// Review repeatedly: all four positions occur, consecutive correct positions differ,
// question objects from the completed attempt are not mutated, feedback never reshuffles.
vm.runInContext(`
state.kind='noun';start(0);const original=state.questions.map(q=>({...q,options:[...q.options]}));
const originalOrder=original[0].options.map(w=>w.id).join(',');const seen=new Set();let last=-1;
for(let i=0;i<100;i++){
 start(0,[original[0]]);const q=state.questions[0],pos=q.options.findIndex(w=>w.id===q.target.id);
 if(pos===last)throw Error('Correct answer repeated position');seen.add(pos);last=pos;
 const before=q.options.map(w=>w.id).join(',');answer(q.options.find(w=>w.id!==q.target.id).id);
 if(state.questions[0].options.map(w=>w.id).join(',')!==before)throw Error('Feedback shuffled choices');
 if(original[0].options.map(w=>w.id).join(',')!==originalOrder)throw Error('Original question mutated');
}
if(seen.size!==4)throw Error('Not all positions reachable');
`,c);
console.log('PASS: all 60 noun courses and choices have one category; たたく exists; random review positions, no consecutive repeats, immutable attempts, stable feedback.');

require("./verify-levels.cjs");
