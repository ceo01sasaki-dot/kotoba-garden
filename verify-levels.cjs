const fs=require('fs'),vm=require('vm'),assert=require('assert');
function context(data){let disk=data?JSON.stringify(data):null;const nodes={};const node=()=>({innerHTML:'',dataset:{},classList:{add(){},remove(){}},showModal(){this.open=true},close(){this.open=false}});const c={window:{scrollTo(){}},document:{querySelector:s=>nodes[s]||(nodes[s]=node()),addEventListener(){}},localStorage:{getItem(){return disk},setItem(k,v){disk=v}},setTimeout(){},clearTimeout(){}};vm.createContext(c);for(const f of ['verbs.js','nouns.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);c.VERBS=c.window.VERBS;c.NOUNS=c.window.NOUNS;vm.runInContext(fs.readFileSync('dist/app.js','utf8'),c);return {run:s=>vm.runInContext(s,c),data:()=>JSON.parse(disk)}}
const t=context();
t.run(`
function expect(ok,message){if(!ok)throw Error(message)}
function complete(wrongIds=[]){const count=state.questions.length;for(let i=0;i<count;i++){const q=state.questions[state.index];answer(wrongIds.includes(q.target.id)?q.options.find(w=>w.id!==q.target.id).id:q.target.id);next()}}
expect(levelInfo('verb').level===1&&levelInfo('noun').level===1,'new progress starts at level 1');
state.kind='verb';start(0);complete();expect(levelInfo('verb').xp===100&&levelInfo('verb').level===2,'perfect initial ten gives 100');expect(state.reward.levelUp&&state.reward.amount===100,'level-up result');
for(let i=0;i<5;i++){next();finishChallenge();render()}
expect(levelInfo('verb').xp===100,'results cannot award twice');
expect(levelInfo('noun').xp===0,'categories independent');
state.kind='noun';start(0);const missedId=state.questions[2].target.id;complete([missedId]);
expect(levelInfo('noun').xp===0&&state.challenge.remaining.length===1,'initial mistake awards nothing yet');
let missed=state.questions.filter((q,i)=>!state.answers[i].correct);start(0,missed);complete([missedId]);
expect(levelInfo('noun').xp===0,'failed review gives no partial payout');
missed=state.questions.filter((q,i)=>!state.answers[i].correct);start(0,missed);complete();
expect(levelInfo('noun').xp===50&&levelInfo('noun').level===1&&levelInfo('noun').part===50,'review completion gives half level');
expect(!state.reward.levelUp&&state.reward.amount===50,'half-level result');
next();finishChallenge();expect(levelInfo('noun').xp===50,'half reward idempotent');
start(1);const failed=state.questions.slice(0,3).map(q=>q.target.id);complete(failed);
missed=state.questions.filter((q,i)=>!state.answers[i].correct);start(1,missed);complete([failed[0]]);
expect(levelInfo('noun').xp===50&&state.challenge.remaining.length===1,'multiple review passes award only when all original errors mastered');
missed=state.questions.filter((q,i)=>!state.answers[i].correct);start(1,missed);complete();
expect(levelInfo('noun').xp===100&&levelInfo('noun').level===2&&state.reward.levelUp,'two halves carry to next level');
state.kind='verb';start(2);answer(state.questions[0].target.id);next();expect(levelInfo('verb').xp===100,'unfinished course gives no XP');
start(0);complete();expect(levelInfo('verb').xp===200&&levelInfo('verb').level===3,'new full attempt can earn again');
expect(saved.scores['verb-0'].best===10,'existing score retained');
`);
const disk=t.data();assert.equal(disk.progress.verb.xp,200);assert.equal(disk.progress.noun.xp,100);const reloaded=context(disk);assert.equal(reloaded.run("levelInfo('verb').level"),3);assert.equal(reloaded.run("levelInfo('noun').level"),2);
reloaded.run("saved.progress.verb.xp=1000000;state.kind='verb';start(0);for(let i=0;i<10;i++){answer(state.questions[i].target.id);next()}");assert.equal(reloaded.run("levelInfo('verb').level"),10002);
const legacy=context({verbEdition:'school-100-two-panel',nounEdition:'nouns-300-everyday-categories-v2',scores:{'verb-0':{best:10,last:10,attempts:3}}});assert.equal(legacy.run("saved.scores['verb-0'].attempts"),3);assert.equal(legacy.run("levelInfo('verb').xp"),0);
console.log('PASS: levels: perfect +100; review mastery +50; no premature or duplicate awards; two halves carry; separate categories; retry, persistence, legacy scores, no level cap.');
