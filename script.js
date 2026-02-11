/* SYSTECH INSTITUTE PORTAL — script.js v5 */
const K={INIT:'sys_v5',ME:'sys_me',USERS:'sys_users',COURSES:'sys_courses',ASSIGN:'sys_assign',SUBS:'sys_subs',OUTLINE:'sys_outline',NOTES:'sys_notes',ANN:'sys_announcements',ATT:'sys_attendance',TT:'sys_timetable'};
const get=k=>JSON.parse(localStorage.getItem(k)||'[]');
const put=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const me=()=>JSON.parse(localStorage.getItem(K.ME));
const fmtDate=d=>new Date(d).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'});
const fmtDT=d=>new Date(d).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
const daysLeft=d=>Math.ceil((new Date(d)-new Date())/864e5);
function toast(m,t='info'){const e=document.createElement('div');e.className=`toast ${t}`;e.textContent=m;document.getElementById('toast-container').appendChild(e);setTimeout(()=>{e.style.opacity='0';setTimeout(()=>e.remove(),400)},3000)}
function openModal(id){document.getElementById('modal-overlay').classList.remove('hide');document.getElementById('modal-overlay').classList.add('show');const m=document.getElementById(id);m.classList.remove('hide');setTimeout(()=>m.classList.add('show'),10)}
function closeAllModals(){document.querySelectorAll('.modal').forEach(m=>{m.classList.remove('show');setTimeout(()=>m.classList.add('hide'),250)});const o=document.getElementById('modal-overlay');o.classList.remove('show');setTimeout(()=>o.classList.add('hide'),250)}

function seed(){
if(localStorage.getItem(K.INIT))return;
put(K.USERS,[
{id:'admin1',username:'admin',password:'admin123',name:'System Admin',role:'admin'},
{id:'T1001',username:'ayesha',password:'teach123',name:'Dr. Ayesha Khan',role:'teacher',subject:'Web Development'},
{id:'T1002',username:'ali.sir',password:'teach123',name:'Prof. Ali Raza',role:'teacher',subject:'Graphic Designing'},
{id:'T1003',username:'usman',password:'teach123',name:'Sir Usman Tariq',role:'teacher',subject:'Python Programming'},
{id:'S2001',username:'muzamil',password:'stud123',name:'Muzamil Chang',role:'student',program:'DIT',semester:'3',fatherName:'Muhammad Aslam',phone:'0301-1234567'},
{id:'S2002',username:'fatima',password:'stud123',name:'Fatima Noor',role:'student',program:'DIT',semester:'3',fatherName:'Noor Ahmed',phone:'0312-2345678'},
{id:'S2003',username:'hamza',password:'stud123',name:'Hamza Ali',role:'student',program:'DGD',semester:'2',fatherName:'Ali Khan',phone:'0333-3456789'},
{id:'S2004',username:'sana',password:'stud123',name:'Sana Malik',role:'student',program:'DIT',semester:'4',fatherName:'Malik Riaz',phone:'0345-4567890'},
{id:'S2005',username:'ahmed',password:'stud123',name:'Ahmed Raza',role:'student',program:'DGD',semester:'2',fatherName:'Raza Shah',phone:'0300-5678901'}
]);
put(K.COURSES,[
{id:'C1',name:'Web Development',teacherId:'T1001',studentIds:['S2001','S2002','S2004']},
{id:'C2',name:'Graphic Designing',teacherId:'T1002',studentIds:['S2003','S2005']},
{id:'C3',name:'Python Programming',teacherId:'T1003',studentIds:['S2001','S2003','S2005']}
]);
const n=Date.now();
put(K.ASSIGN,[
{id:'A1',courseId:'C1',title:'HTML Semantic Analysis',desc:'Analyze DOM tree of 3 websites.',due:new Date(n+864e5*2).toISOString(),marks:10,teacherId:'T1001',created:new Date(n-864e5).toISOString()},
{id:'A2',courseId:'C1',title:'CSS Glassmorphism Card',desc:'Create a responsive login card using CSS Glassmorphism.',due:new Date(n+864e5*5).toISOString(),marks:20,teacherId:'T1001',created:new Date(n).toISOString()},
{id:'A3',courseId:'C2',title:'Logo Design Project',desc:'Design a modern logo for a fictional startup.',due:new Date(n+864e5*3).toISOString(),marks:25,teacherId:'T1002',created:new Date(n).toISOString()},
{id:'A4',courseId:'C3',title:'Python Calculator',desc:'Build a calculator app using Python with GUI.',due:new Date(n+864e5*4).toISOString(),marks:15,teacherId:'T1003',created:new Date(n).toISOString()}
]);
put(K.SUBS,[]);
put(K.OUTLINE,[
{id:'O1',courseId:'C1',title:'Intro to Web Technologies',done:true,teacherId:'T1001'},
{id:'O2',courseId:'C1',title:'HTML5 & Semantic Elements',done:true,teacherId:'T1001'},
{id:'O3',courseId:'C1',title:'CSS3 Flexbox & Grid',done:false,teacherId:'T1001'},
{id:'O4',courseId:'C2',title:'Design Principles',done:true,teacherId:'T1002'},
{id:'O5',courseId:'C2',title:'Color Theory & Typography',done:false,teacherId:'T1002'},
{id:'O6',courseId:'C3',title:'Python Basics & Syntax',done:true,teacherId:'T1003'},
{id:'O7',courseId:'C3',title:'Functions & Modules',done:false,teacherId:'T1003'}
]);
put(K.NOTES,[
{id:'N1',courseId:'C1',title:'Lecture 1 — Web Basics',content:'The internet is a global network.\n• Client-Server Model\n• HTTP/HTTPS\n• DNS Resolution',teacherId:'T1001',date:new Date().toISOString()},
{id:'N2',courseId:'C3',title:'Python Variables',content:'Variables in Python:\n• No type declaration needed\n• Dynamic typing\n• x = 10, name = "Ali"',teacherId:'T1003',date:new Date().toISOString()}
]);
put(K.ANN,[
{id:'AN1',title:'Welcome to Systech Institute!',content:'All students must collect their ID cards from the admin office by Friday.',priority:'important',date:new Date().toISOString(),by:'admin1'},
{id:'AN2',title:'Lab Schedule Updated',content:'Python Lab has been moved to Lab-5 starting next week.',priority:'normal',date:new Date(n-864e5).toISOString(),by:'admin1'}
]);
put(K.ATT,[]);
put(K.TT,[
{id:'TT1',courseId:'C1',day:'Monday',startTime:'09:00',endTime:'10:30',room:'Lab-1'},
{id:'TT2',courseId:'C1',day:'Wednesday',startTime:'09:00',endTime:'10:30',room:'Lab-1'},
{id:'TT3',courseId:'C2',day:'Tuesday',startTime:'11:00',endTime:'12:30',room:'Lab-3'},
{id:'TT4',courseId:'C2',day:'Thursday',startTime:'11:00',endTime:'12:30',room:'Lab-3'},
{id:'TT5',courseId:'C3',day:'Monday',startTime:'11:00',endTime:'12:30',room:'Lab-2'},
{id:'TT6',courseId:'C3',day:'Friday',startTime:'09:00',endTime:'10:30',room:'Lab-2'}
]);
localStorage.setItem(K.INIT,'1');
}

const MENUS={
admin:[{id:'admin-dash',icon:'fa-chart-pie',label:'Dashboard'},{id:'admin-classes',icon:'fa-layer-group',label:'Classes'},{id:'admin-teachers',icon:'fa-chalkboard-user',label:'Teachers'},{id:'admin-students',icon:'fa-user-graduate',label:'Students'},{id:'admin-announce',icon:'fa-bullhorn',label:'Announcements'},{id:'admin-timetable',icon:'fa-clock',label:'Timetable'}],
teacher:[{id:'t-dash',icon:'fa-chart-line',label:'Dashboard'},{id:'t-courses',icon:'fa-book-open',label:'Course & Notes'},{id:'t-assign',icon:'fa-file-pen',label:'Assignments'},{id:'t-subs',icon:'fa-folder-open',label:'Submissions'},{id:'t-attendance',icon:'fa-clipboard-check',label:'Attendance'},{id:'t-announce',icon:'fa-bullhorn',label:'Notices'}],
student:[{id:'s-dash',icon:'fa-house',label:'Home'},{id:'s-profile',icon:'fa-id-card',label:'My Profile'},{id:'s-resources',icon:'fa-book',label:'Resources'},{id:'s-assign',icon:'fa-list-check',label:'Assignments'},{id:'s-calendar',icon:'fa-calendar-days',label:'Calendar'},{id:'s-attendance',icon:'fa-clipboard-check',label:'Attendance'},{id:'s-announce',icon:'fa-bullhorn',label:'Notices'},{id:'s-timetable',icon:'fa-clock',label:'Timetable'}]
};
let currentView='';
function buildSidebar(r){const ul=document.getElementById('sidebar-menu');ul.innerHTML=MENUS[r].map((m,i)=>`<li data-view="${m.id}" class="${i===0?'active':''}"><i class="fa-solid ${m.icon}"></i> ${m.label}</li>`).join('');ul.querySelectorAll('li').forEach(li=>{li.addEventListener('click',()=>{ul.querySelectorAll('li').forEach(l=>l.classList.remove('active'));li.classList.add('active');navigateTo(li.dataset.view);document.querySelector('.sidebar').classList.remove('open')})})}
function navigateTo(v){currentView=v;document.getElementById('topbar-title').textContent=MENUS[me().role].find(m=>m.id===v)?.label||'Dashboard';renderView(v)}

function renderView(id){const b=document.getElementById('content');const h=R[id];b.innerHTML=h?h():'';}

/* ═══ HELPERS ═══ */
function getStuCourses(){return get(K.COURSES).filter(c=>c.studentIds.includes(me().id))}
function getStuAssign(){const cids=getStuCourses().map(c=>c.id);return get(K.ASSIGN).filter(a=>cids.includes(a.courseId))}

/* ═══ VIEW RENDERERS ═══ */
const R={};

// ADMIN DASHBOARD
R['admin-dash']=()=>{const u=get(K.USERS),c=get(K.COURSES),a=get(K.ASSIGN),s=get(K.SUBS);
return `<div class="view-anim"><div class="welcome"><h2>Admin Dashboard</h2><p>Systech Institute of Technology & Skill Development</p></div>
<div class="stats-row">
<div class="card stat-card"><div class="icon-box grad-purple"><i class="fa-solid fa-chalkboard-user"></i></div><div><h4>Teachers</h4><div class="number">${u.filter(x=>x.role==='teacher').length}</div></div></div>
<div class="card stat-card"><div class="icon-box grad-blue"><i class="fa-solid fa-user-graduate"></i></div><div><h4>Students</h4><div class="number">${u.filter(x=>x.role==='student').length}</div></div></div>
<div class="card stat-card"><div class="icon-box grad-teal"><i class="fa-solid fa-layer-group"></i></div><div><h4>Classes</h4><div class="number">${c.length}</div></div></div>
<div class="card stat-card"><div class="icon-box grad-amber"><i class="fa-solid fa-file-pen"></i></div><div><h4>Assignments</h4><div class="number">${a.length}</div></div></div>
</div>
<div class="sec-head"><h3>Quick Actions</h3></div>
<div style="display:flex;gap:12px;flex-wrap:wrap">
<button class="btn-primary" onclick="openAddCourseModal()"><i class="fa-solid fa-plus"></i> Create Class</button>
<button class="btn-primary" onclick="openModal('modal-add-teacher')"><i class="fa-solid fa-plus"></i> Add Teacher</button>
<button class="btn-primary" onclick="openModal('modal-add-student')"><i class="fa-solid fa-plus"></i> Add Student</button>
<button class="btn-primary" onclick="openModal('modal-announcement')"><i class="fa-solid fa-bullhorn"></i> Post Announcement</button>
</div></div>`};

// ADMIN CLASSES
R['admin-classes']=()=>{const courses=get(K.COURSES),users=get(K.USERS);
return `<div class="view-anim"><div class="sec-head"><h3>All Classes</h3><button class="btn-primary" onclick="openAddCourseModal()"><i class="fa-solid fa-plus"></i> New Class</button></div>
<div class="table-wrap"><table><thead><tr><th>Class</th><th>Teacher</th><th>Students</th><th>Count</th><th>Actions</th></tr></thead>
<tbody>${courses.map(c=>{const t=users.find(u=>u.id===c.teacherId);return `<tr><td><strong>${c.name}</strong></td><td>${t?t.name:'-'}</td>
<td style="max-width:250px">${c.studentIds.map(sid=>{const s=users.find(u=>u.id===sid);return s?s.name:'?'}).join(', ')||'<em style="color:var(--text-faint)">None</em>'}</td>
<td><span class="tag tag-teal">${c.studentIds.length}</span></td>
<td><button class="btn-primary btn-sm" onclick="openEditCourse('${c.id}')"><i class="fa-solid fa-pen"></i></button> <button class="btn-primary btn-sm btn-danger" onclick="deleteCourse('${c.id}')"><i class="fa-solid fa-trash"></i></button></td></tr>`}).join('')}</tbody></table></div></div>`};

// ADMIN TEACHERS
R['admin-teachers']=()=>{const t=get(K.USERS).filter(u=>u.role==='teacher');
return `<div class="view-anim"><div class="sec-head"><h3>Teachers</h3><button class="btn-primary" onclick="openModal('modal-add-teacher')"><i class="fa-solid fa-plus"></i> New</button></div>
<div class="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Subject</th><th>Username</th><th>Password</th><th>Del</th></tr></thead>
<tbody>${t.map(x=>`<tr><td>${x.id}</td><td>${x.name}</td><td>${x.subject}</td><td><code>${x.username}</code></td><td><code>${x.password}</code></td>
<td><button class="btn-icon" onclick="removeUser('${x.id}')"><i class="fa-solid fa-trash" style="color:var(--red)"></i></button></td></tr>`).join('')}</tbody></table></div></div>`};

// ADMIN STUDENTS
R['admin-students']=()=>{const s=get(K.USERS).filter(u=>u.role==='student'),c=get(K.COURSES);
return `<div class="view-anim"><div class="sec-head"><h3>Students</h3><button class="btn-primary" onclick="openModal('modal-add-student')"><i class="fa-solid fa-plus"></i> New</button></div>
<div class="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Father</th><th>Phone</th><th>Program</th><th>Classes</th><th>Login</th><th>Del</th></tr></thead>
<tbody>${s.map(x=>{const enrolled=c.filter(cc=>cc.studentIds.includes(x.id)).map(cc=>`<span class="tag tag-teal" style="margin:2px">${cc.name}</span>`).join('')||'—';
return `<tr><td>${x.id}</td><td>${x.name}</td><td>${x.fatherName||'-'}</td><td>${x.phone||'-'}</td><td>${x.program} S${x.semester}</td><td>${enrolled}</td>
<td><code>${x.username}</code>/<code>${x.password}</code></td>
<td><button class="btn-icon" onclick="removeUser('${x.id}')"><i class="fa-solid fa-trash" style="color:var(--red)"></i></button></td></tr>`}).join('')}</tbody></table></div></div>`};

// ADMIN ANNOUNCEMENTS
R['admin-announce']=()=>{const ann=get(K.ANN).sort((a,b)=>new Date(b.date)-new Date(a.date));
return `<div class="view-anim"><div class="sec-head"><h3>Announcements</h3><button class="btn-primary" onclick="openModal('modal-announcement')"><i class="fa-solid fa-plus"></i> New</button></div>
${ann.map(a=>`<div class="card announce-card ${a.priority}" style="margin-bottom:14px">
<div class="card-header"><span class="card-title">${a.title}</span><span class="tag tag-${a.priority==='urgent'?'red':a.priority==='important'?'orange':'teal'}">${a.priority}</span></div>
<div class="card-body">${a.content}</div>
<div class="card-meta"><i class="fa-regular fa-calendar"></i> ${fmtDate(a.date)}</div>
<button class="btn-icon" style="position:absolute;top:14px;right:50px" onclick="deleteAnn('${a.id}')"><i class="fa-solid fa-trash" style="color:var(--red)"></i></button>
</div>`).join('')}</div>`};

// ADMIN TIMETABLE
R['admin-timetable']=()=>renderTimetableView(get(K.COURSES),true);

// TEACHER DASH
R['t-dash']=()=>{const u=me(),courses=get(K.COURSES).filter(c=>c.teacherId===u.id),ma=get(K.ASSIGN).filter(a=>a.teacherId===u.id),ms=get(K.SUBS).filter(s=>ma.some(a=>a.id===s.assignmentId));
return `<div class="view-anim"><div class="welcome"><h2>Welcome, ${u.name.split(' ')[0]}!</h2><p>${u.subject} — ${fmtDate(new Date())}</p></div>
<div class="stats-row">
<div class="card stat-card"><div class="icon-box grad-teal"><i class="fa-solid fa-layer-group"></i></div><div><h4>My Classes</h4><div class="number">${courses.length}</div></div></div>
<div class="card stat-card"><div class="icon-box grad-blue"><i class="fa-solid fa-file-pen"></i></div><div><h4>Assignments</h4><div class="number">${ma.length}</div></div></div>
<div class="card stat-card"><div class="icon-box grad-green"><i class="fa-solid fa-paper-plane"></i></div><div><h4>Submissions</h4><div class="number">${ms.length}</div></div></div>
</div>
<h3 style="margin-bottom:14px">My Classes</h3>
<div class="grid-cards">${courses.map(c=>`<div class="card"><div class="card-accent" style="background:var(--accent)"></div><div class="card-title">${c.name}</div><div class="card-meta"><i class="fa-solid fa-users"></i> ${c.studentIds.length} students</div></div>`).join('')}</div></div>`};

// TEACHER COURSES & NOTES
R['t-courses']=()=>{const u=me(),courses=get(K.COURSES).filter(c=>c.teacherId===u.id),ol=get(K.OUTLINE).filter(o=>o.teacherId===u.id),notes=get(K.NOTES).filter(n=>n.teacherId===u.id);
let h=`<div class="view-anim"><div class="sec-head"><h3>Course & Notes</h3><div style="display:flex;gap:8px"><button class="btn-primary btn-sm" onclick="openTopicModal()"><i class="fa-solid fa-plus"></i> Topic</button><button class="btn-primary btn-sm" onclick="openNoteModal()"><i class="fa-solid fa-plus"></i> Note</button></div></div>`;
courses.forEach(c=>{const tops=ol.filter(o=>o.courseId===c.id),cn=notes.filter(n=>n.courseId===c.id),pct=tops.length?Math.round(tops.filter(t=>t.done).length/tops.length*100):0;
h+=`<div class="card" style="margin-bottom:24px"><h3 style="color:var(--accent);margin-bottom:4px">${c.name}</h3><p style="color:var(--text-dim);font-size:.85rem;margin-bottom:16px">${c.studentIds.length} students</p>
<div class="progress-item"><div class="progress-label"><span>Syllabus</span><span>${pct}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>
<h4 style="margin:18px 0 10px">Outline</h4>${tops.map(t=>`<div class="outline-item ${t.done?'done':''}"><i class="fa-solid ${t.done?'fa-circle-check':'fa-circle'}" style="color:${t.done?'var(--green)':'var(--text-faint)'}"></i><span style="flex:1">${t.title}</span>
<button class="btn-icon" onclick="toggleTopic('${t.id}')"><i class="fa-solid fa-rotate"></i></button><button class="btn-icon" onclick="deleteTopic('${t.id}')"><i class="fa-solid fa-trash" style="color:var(--red)"></i></button></div>`).join('')}
<h4 style="margin:18px 0 10px">Notes</h4>${cn.map(n=>`<div class="card note-card" style="margin-bottom:10px"><h5>${n.title}</h5><div class="card-meta" style="margin-bottom:6px"><i class="fa-regular fa-calendar"></i> ${fmtDate(n.date)}</div><p>${n.content}</p>
<button class="btn-icon" style="position:absolute;top:14px;right:14px" onclick="deleteNote('${n.id}')"><i class="fa-solid fa-trash" style="color:var(--red)"></i></button></div>`).join('')||'<p style="color:var(--text-faint)">No notes yet.</p>'}
</div>`});
if(!courses.length)h+=`<div class="card"><p style="color:var(--text-faint)">No classes assigned. Ask admin.</p></div>`;
return h+'</div>'};

// TEACHER ASSIGNMENTS
R['t-assign']=()=>{const u=me(),courses=get(K.COURSES).filter(c=>c.teacherId===u.id),ma=get(K.ASSIGN).filter(a=>a.teacherId===u.id).sort((a,b)=>new Date(a.due)-new Date(b.due)),subs=get(K.SUBS);
return `<div class="view-anim"><div class="sec-head"><h3>Assignments</h3><button class="btn-primary" onclick="openAssignModal()"><i class="fa-solid fa-plus"></i> Create</button></div>
<div class="grid-cards">${ma.map(a=>{const sc=subs.filter(s=>s.assignmentId===a.id).length,dl=daysLeft(a.due),course=courses.find(c=>c.id===a.courseId),tc=dl<0?'tag-red':dl<=2?'tag-yellow':'tag-green',tt=dl<0?'Overdue':dl===0?'Today':dl+'d left';
return `<div class="card"><div class="card-accent" style="background:var(--accent)"></div>
<div class="card-header"><span class="card-title">${a.title}</span><span class="tag ${tc}">${tt}</span></div>
<div style="margin-bottom:8px"><span class="tag tag-teal">${course?course.name:''}</span></div>
<div class="card-body">${a.desc}</div>
<div class="card-meta"><i class="fa-regular fa-clock"></i> Due: ${fmtDT(a.due)} | ${a.marks} marks</div>
<div class="card-footer"><span>${sc} submission${sc!==1?'s':''}</span>
<div style="display:flex;gap:8px"><button class="btn-primary btn-sm" onclick="navigateTo('t-subs')"><i class="fa-solid fa-eye"></i></button>
<button class="btn-primary btn-sm btn-danger" onclick="deleteAssignment('${a.id}')"><i class="fa-solid fa-trash"></i></button></div></div></div>`}).join('')}
${!ma.length?'<div class="card"><p style="color:var(--text-faint)">No assignments yet.</p></div>':''}</div></div>`};

// TEACHER SUBMISSIONS
R['t-subs']=()=>{const u=me(),ma=get(K.ASSIGN).filter(a=>a.teacherId===u.id),subs=get(K.SUBS),users=get(K.USERS),courses=get(K.COURSES);
let h=`<div class="view-anim"><div class="sec-head"><h3>Submissions</h3></div>`;
ma.forEach(a=>{const as=subs.filter(s=>s.assignmentId===a.id),course=courses.find(c=>c.id===a.courseId);
h+=`<div class="card" style="margin-bottom:16px"><div class="card-header"><span class="card-title">${a.title}</span><span class="tag tag-teal">${course?course.name:''}</span></div>
<div class="card-meta" style="margin-bottom:14px"><i class="fa-regular fa-clock"></i> Due: ${fmtDT(a.due)} | <span class="tag tag-green">${as.length} submitted</span></div>`;
if(!as.length)h+=`<p style="color:var(--text-faint);font-size:.88rem">No submissions yet.</p>`;
else as.forEach(sub=>{const stu=users.find(x=>x.id===sub.studentId);
h+=`<div class="sub-row"><div class="sub-info"><strong>${stu?stu.name:'?'} <small>(${stu?stu.username:''})</small></strong>
<small>Submitted: ${fmtDT(sub.submittedAt)}${sub.fileName?' — 📎 '+sub.fileName:''}</small>
${sub.grade!==undefined?`<div style="margin-top:4px"><span class="tag tag-green">Graded: ${sub.grade}/${a.marks}</span> ${sub.feedback?'<small style="color:var(--text-dim)"> — '+sub.feedback+'</small>':''}</div>`:''}
</div><div style="display:flex;gap:6px;flex-shrink:0">
<button class="btn-primary btn-sm" onclick="openGradeModal('${sub.id}','${a.title}',${a.marks})"><i class="fa-solid fa-star"></i> Grade</button>
<button class="btn-primary btn-sm" onclick="downloadSub('${sub.id}')"><i class="fa-solid fa-download"></i></button></div></div>`});
h+=`</div>`});
if(!ma.length)h+=`<div class="card"><p style="color:var(--text-faint)">No assignments.</p></div>`;
return h+'</div>'};

// TEACHER ATTENDANCE
R['t-attendance']=()=>{const u=me(),courses=get(K.COURSES).filter(c=>c.teacherId===u.id),att=get(K.ATT),users=get(K.USERS);
let h=`<div class="view-anim"><div class="sec-head"><h3>Attendance</h3><button class="btn-primary" onclick="openAttModal()"><i class="fa-solid fa-plus"></i> Mark Attendance</button></div>`;
courses.forEach(c=>{const cAtt=att.filter(a=>a.courseId===c.id).sort((a,b)=>b.date.localeCompare(a.date));
h+=`<div class="card" style="margin-bottom:16px"><h4 style="color:var(--accent);margin-bottom:12px">${c.name}</h4>`;
if(!cAtt.length)h+=`<p style="color:var(--text-faint)">No attendance records.</p>`;
else cAtt.slice(0,10).forEach(rec=>{h+=`<div style="padding:10px 0;border-bottom:1px solid var(--border)"><strong>${rec.date}</strong><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">`;
rec.records.forEach(r=>{const stu=users.find(u=>u.id===r.studentId);h+=`<span class="att-badge ${r.present?'att-present':'att-absent'}">${stu?stu.name:'?'}: ${r.present?'P':'A'}</span>`});
h+=`</div></div>`});
h+=`</div>`});
return h+'</div>'};

// TEACHER ANNOUNCE (view only)
R['t-announce']=()=>renderAnnouncementsReadOnly();

// STUDENT DASH
R['s-dash']=()=>{const u=me(),mc=getStuCourses(),ma=getStuAssign(),subs=get(K.SUBS),ms=subs.filter(s=>s.studentId===u.id),pending=ma.filter(a=>!ms.some(s=>s.assignmentId===a.id)),ol=get(K.OUTLINE);
let prog='';mc.forEach(c=>{const tops=ol.filter(o=>o.courseId===c.id);if(!tops.length)return;const pct=Math.round(tops.filter(t=>t.done).length/tops.length*100);
prog+=`<div class="progress-item"><div class="progress-label"><span>${c.name}</span><span>${pct}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>`});
return `<div class="view-anim"><div class="welcome"><h2>Welcome, ${u.name.split(' ')[0]}! 👋</h2><p>${u.program} — Semester ${u.semester} | ${pending.length} pending</p></div>
<div class="stats-row">
<div class="card stat-card"><div class="icon-box grad-teal"><i class="fa-solid fa-layer-group"></i></div><div><h4>My Classes</h4><div class="number">${mc.length}</div></div></div>
<div class="card stat-card"><div class="icon-box grad-red"><i class="fa-solid fa-hourglass-half"></i></div><div><h4>Pending</h4><div class="number">${pending.length}</div></div></div>
<div class="card stat-card"><div class="icon-box grad-green"><i class="fa-solid fa-circle-check"></i></div><div><h4>Submitted</h4><div class="number">${ms.length}</div></div></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:22px">
<div class="card"><h4 style="margin-bottom:14px"><i class="fa-regular fa-clock" style="color:var(--accent)"></i> Deadlines</h4>
${!pending.length?'<p style="color:var(--text-faint)">All caught up! 🎉</p>':pending.sort((a,b)=>new Date(a.due)-new Date(b.due)).slice(0,5).map(a=>{const dl=daysLeft(a.due);return `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)"><span>${a.title}</span><span class="tag ${dl<=1?'tag-red':dl<=3?'tag-yellow':'tag-green'}">${dl<0?'Overdue':dl===0?'Today':dl+'d'}</span></div>`}).join('')}</div>
<div class="card"><h4 style="margin-bottom:14px"><i class="fa-solid fa-chart-line" style="color:var(--accent)"></i> Progress</h4>${prog||'<p style="color:var(--text-faint)">No data.</p>'}</div>
</div></div>`};

// STUDENT PROFILE
R['s-profile']=()=>{const u=me(),mc=getStuCourses(),subs=get(K.SUBS).filter(s=>s.studentId===u.id);
const graded=subs.filter(s=>s.grade!==undefined);const avgGrade=graded.length?Math.round(graded.reduce((a,s)=>a+s.grade,0)/graded.length):'-';
return `<div class="view-anim"><div class="card profile-card">
<img class="profile-avatar" src="https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=0096b7&color=fff&size=200&bold=true" alt="avatar">
<div class="profile-info"><h2>${u.name}</h2><p>Student ID: ${u.id} | ${u.program} — Semester ${u.semester}</p>
<div class="profile-detail">
<div class="pf-row"><small>Father's Name</small><strong>${u.fatherName||'-'}</strong></div>
<div class="pf-row"><small>Phone</small><strong>${u.phone||'-'}</strong></div>
<div class="pf-row"><small>Username</small><strong>${u.username}</strong></div>
<div class="pf-row"><small>Enrolled Classes</small><strong>${mc.length}</strong></div>
<div class="pf-row"><small>Submissions</small><strong>${subs.length}</strong></div>
<div class="pf-row"><small>Avg Grade</small><strong>${avgGrade}</strong></div>
</div></div></div>
<h3 style="margin:22px 0 14px">My Classes</h3>
<div class="grid-cards">${mc.map(c=>`<div class="card"><div class="card-accent" style="background:var(--accent)"></div><div class="card-title">${c.name}</div><div class="card-meta"><i class="fa-solid fa-users"></i> ${c.studentIds.length} classmates</div></div>`).join('')}</div></div>`};

// STUDENT RESOURCES
R['s-resources']=()=>{const mc=getStuCourses(),ol=get(K.OUTLINE),notes=get(K.NOTES),users=get(K.USERS);
let h=`<div class="view-anim"><div class="sec-head"><h3>My Resources</h3></div>`;
if(!mc.length)h+=`<div class="card"><p style="color:var(--text-faint)">Not enrolled in any class.</p></div>`;
mc.forEach(c=>{const t=users.find(u=>u.id===c.teacherId),tops=ol.filter(o=>o.courseId===c.id),cn=notes.filter(n=>n.courseId===c.id),pct=tops.length?Math.round(tops.filter(t=>t.done).length/tops.length*100):0;
h+=`<div class="card" style="margin-bottom:24px"><h3 style="color:var(--accent);margin-bottom:4px">${c.name}</h3><p style="color:var(--text-dim);font-size:.85rem;margin-bottom:16px">By ${t?t.name:''}</p>
<div class="progress-item"><div class="progress-label"><span>Syllabus</span><span>${pct}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>
<h4 style="margin:18px 0 10px">Outline</h4>${tops.map(t=>`<div class="outline-item ${t.done?'done':''}"><i class="fa-solid ${t.done?'fa-circle-check':'fa-circle'}" style="color:${t.done?'var(--green)':'var(--text-faint)'}"></i><span>${t.title}</span></div>`).join('')||'<p style="color:var(--text-faint)">No topics.</p>'}
<h4 style="margin:18px 0 10px">Notes</h4>${cn.map(n=>`<div class="card note-card" style="margin-bottom:10px;background:var(--surface)"><h5>${n.title}</h5><div class="card-meta" style="margin-bottom:6px"><i class="fa-regular fa-calendar"></i> ${fmtDate(n.date)}</div><p>${n.content}</p></div>`).join('')||'<p style="color:var(--text-faint)">No notes.</p>'}</div>`});
return h+'</div>'};

// STUDENT ASSIGNMENTS
R['s-assign']=()=>{const u=me(),mc=getStuCourses(),ma=getStuAssign(),subs=get(K.SUBS),users=get(K.USERS),sorted=[...ma].sort((a,b)=>new Date(a.due)-new Date(b.due));
return `<div class="view-anim"><div class="sec-head"><h3>My Assignments</h3></div>
${!sorted.length?'<div class="card"><p style="color:var(--text-faint)">No assignments.</p></div>':''}
<div class="grid-cards">${sorted.map(a=>{const sub=subs.find(s=>s.assignmentId===a.id&&s.studentId===u.id),isSub=!!sub,course=mc.find(c=>c.id===a.courseId),teacher=users.find(x=>x.id===a.teacherId),dl=daysLeft(a.due);
const tc=isSub?'tag-green':dl<0?'tag-red':dl<=2?'tag-yellow':'tag-blue',tt=isSub?'Submitted ✓':dl<0?'Overdue':dl===0?'Today':dl+'d left';
return `<div class="card"><div class="card-accent" style="background:${isSub?'var(--green)':'var(--accent)'}"></div>
<div class="card-header"><span class="card-title">${a.title}</span><span class="tag ${tc}">${tt}</span></div>
<div style="margin-bottom:8px"><span class="tag tag-teal">${course?course.name:''}</span></div>
<div class="card-body">${a.desc}</div>
<div class="card-meta"><i class="fa-solid fa-user-tie"></i> ${teacher?teacher.name:''}</div>
<div class="card-meta"><i class="fa-regular fa-clock"></i> Due: ${fmtDT(a.due)} | ${a.marks} marks</div>
${sub&&sub.grade!==undefined?`<div class="card-meta" style="margin-top:4px"><span class="tag tag-green"><i class="fa-solid fa-star"></i> Grade: ${sub.grade}/${a.marks}</span>${sub.feedback?' <small>'+sub.feedback+'</small>':''}</div>`:''}
<div class="card-footer">${isSub?'<span class="tag tag-green"><i class="fa-solid fa-check"></i> Done</span>':`<button class="btn-primary btn-sm" onclick="openSubmitModal('${a.id}')"><i class="fa-solid fa-paper-plane"></i> Submit</button>`}</div></div>`}).join('')}</div></div>`};

// STUDENT CALENDAR
R['s-calendar']=()=>{const ma=getStuAssign(),subs=get(K.SUBS),u=me(),now=new Date(),yr=now.getFullYear(),mo=now.getMonth(),fd=new Date(yr,mo,1).getDay(),td=new Date(yr,mo+1,0).getDate(),mn=now.toLocaleString('default',{month:'long',year:'numeric'});
const dd={};ma.forEach(a=>{const d=new Date(a.due);if(d.getMonth()===mo&&d.getFullYear()===yr){dd[d.getDate()]=dd[d.getDate()]||[];dd[d.getDate()].push(a)}});
const dn=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];let cal=dn.map(d=>`<div class="cal-day-name">${d}</div>`).join('');
for(let i=0;i<fd;i++)cal+=`<div class="cal-day empty"></div>`;
for(let d=1;d<=td;d++){const it=d===now.getDate()?'today':'',hl=dd[d]?'has-deadline':'',tip=dd[d]?`title="${dd[d].map(a=>a.title).join(', ')}"`:''  ;cal+=`<div class="cal-day ${it} ${hl}" ${tip}>${d}</div>`}
const tm=ma.filter(a=>{const d=new Date(a.due);return d.getMonth()===mo&&d.getFullYear()===yr}).sort((a,b)=>new Date(a.due)-new Date(b.due));
return `<div class="view-anim"><div class="sec-head"><h3>Calendar</h3></div><div class="card" style="margin-bottom:24px"><div class="cal-header"><h4>${mn}</h4></div><div class="cal-grid">${cal}</div></div>
<h4 style="margin-bottom:14px">This Month</h4>${!tm.length?'<div class="card"><p style="color:var(--text-faint)">Nothing this month.</p></div>':tm.map(a=>{const done=subs.some(s=>s.assignmentId===a.id&&s.studentId===u.id);const mc=getStuCourses(),course=mc.find(c=>c.id===a.courseId);
return `<div class="sub-row"><div class="sub-info"><strong>${a.title}</strong><small>${course?course.name+' — ':''}Due: ${fmtDT(a.due)} — ${a.marks}m</small></div><span class="tag ${done?'tag-green':'tag-yellow'}">${done?'Submitted':'Pending'}</span></div>`}).join('')}</div>`};

// STUDENT ATTENDANCE
R['s-attendance']=()=>{const u=me(),mc=getStuCourses(),att=get(K.ATT),users=get(K.USERS);
let h=`<div class="view-anim"><div class="sec-head"><h3>My Attendance</h3></div>`;
mc.forEach(c=>{const cAtt=att.filter(a=>a.courseId===c.id).sort((a,b)=>b.date.localeCompare(a.date));
const total=cAtt.length,present=cAtt.filter(r=>r.records.some(x=>x.studentId===u.id&&x.present)).length,pct=total?Math.round(present/total*100):0;
h+=`<div class="card" style="margin-bottom:16px"><h4 style="color:var(--accent);margin-bottom:8px">${c.name}</h4>
<div class="progress-item"><div class="progress-label"><span>Attendance: ${present}/${total}</span><span>${pct}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:linear-gradient(90deg,${pct>=75?'var(--green)':'var(--red)'},${pct>=75?'#16a34a':'#dc2626'})"></div></div></div>
<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">${cAtt.slice(0,15).map(r=>{const rec=r.records.find(x=>x.studentId===u.id);return `<span class="att-badge ${rec&&rec.present?'att-present':'att-absent'}">${r.date}: ${rec&&rec.present?'P':'A'}</span>`}).join('')}</div></div>`});
if(!mc.length)h+=`<div class="card"><p style="color:var(--text-faint)">Not enrolled.</p></div>`;
return h+'</div>'};

// STUDENT ANNOUNCE
R['s-announce']=()=>renderAnnouncementsReadOnly();
// STUDENT TIMETABLE
R['s-timetable']=()=>renderTimetableView(getStuCourses(),false);

/* ═══ SHARED VIEWS ═══ */
function renderAnnouncementsReadOnly(){
const ann=get(K.ANN).sort((a,b)=>new Date(b.date)-new Date(a.date));
return `<div class="view-anim"><div class="sec-head"><h3>Announcements</h3></div>
${!ann.length?'<div class="card"><p style="color:var(--text-faint)">No announcements.</p></div>':''}
${ann.map(a=>`<div class="card announce-card ${a.priority}" style="margin-bottom:14px">
<div class="card-header"><span class="card-title">${a.title}</span><span class="tag tag-${a.priority==='urgent'?'red':a.priority==='important'?'orange':'teal'}">${a.priority}</span></div>
<div class="card-body">${a.content}</div>
<div class="card-meta"><i class="fa-regular fa-calendar"></i> ${fmtDate(a.date)}</div></div>`).join('')}</div>`}

function renderTimetableView(courses,isAdmin){
const tt=get(K.TT),allC=get(K.COURSES),users=get(K.USERS);
const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let h=`<div class="view-anim"><div class="sec-head"><h3>Timetable</h3>${isAdmin?`<button class="btn-primary" onclick="openTTModal()"><i class="fa-solid fa-plus"></i> Add</button>`:''}</div>
<div class="card" style="overflow-x:auto"><div class="tt-grid"><div class="tt-cell tt-head">Time</div>${days.map(d=>`<div class="tt-cell tt-head">${d.slice(0,3)}</div>`).join('')}`;
const slots=['09:00','10:00','11:00','12:00','13:00','14:00','15:00'];
slots.forEach(s=>{h+=`<div class="tt-cell" style="font-weight:600;color:var(--text-dim)">${s}</div>`;
days.forEach(d=>{const entries=tt.filter(e=>{const c=courses.find(cc=>cc.id===e.courseId);return c&&e.day===d&&e.startTime<=s&&e.endTime>s});
if(entries.length){const e=entries[0],c=allC.find(cc=>cc.id===e.courseId),t=users.find(u=>u.id===c?.teacherId);
h+=`<div class="tt-cell" style="background:rgba(0,180,216,.08)"><div class="tt-slot">${c?c.name:''}</div><div class="tt-room">${e.room}${t&&!isAdmin?'':(t?' — '+t.name:'')}</div>${isAdmin?`<button class="btn-icon" onclick="deleteTT('${e.id}')" style="margin-top:2px"><i class="fa-solid fa-xmark" style="font-size:.7rem;color:var(--red)"></i></button>`:''}</div>`}
else h+=`<div class="tt-cell"></div>`})});
h+=`</div></div></div>`;return h}

/* ═══ ACTIONS ═══ */
function removeUser(id){if(!confirm('Delete?'))return;put(K.USERS,get(K.USERS).filter(u=>u.id!==id));let c=get(K.COURSES);c.forEach(x=>x.studentIds=x.studentIds.filter(s=>s!==id));put(K.COURSES,c);toast('Deleted','success');renderView(currentView)}
function toggleTopic(id){const o=get(K.OUTLINE);const t=o.find(x=>x.id===id);if(t)t.done=!t.done;put(K.OUTLINE,o);renderView(currentView)}
function deleteTopic(id){put(K.OUTLINE,get(K.OUTLINE).filter(o=>o.id!==id));renderView(currentView)}
function deleteNote(id){put(K.NOTES,get(K.NOTES).filter(n=>n.id!==id));renderView(currentView)}
function deleteAssignment(id){if(!confirm('Delete assignment and all submissions?'))return;put(K.ASSIGN,get(K.ASSIGN).filter(a=>a.id!==id));put(K.SUBS,get(K.SUBS).filter(s=>s.assignmentId!==id));toast('Deleted','success');renderView(currentView)}
function deleteCourse(id){if(!confirm('Delete class?'))return;put(K.COURSES,get(K.COURSES).filter(c=>c.id!==id));toast('Deleted','success');renderView(currentView)}
function deleteAnn(id){put(K.ANN,get(K.ANN).filter(a=>a.id!==id));toast('Deleted','success');renderView(currentView)}
function deleteTT(id){put(K.TT,get(K.TT).filter(t=>t.id!==id));toast('Removed','success');renderView(currentView)}
function openSubmitModal(id){document.getElementById('submit-ass-id').value=id;openModal('modal-submit-assignment')}
function downloadSub(sid){const sub=get(K.SUBS).find(s=>s.id===sid);if(!sub)return;const stu=get(K.USERS).find(u=>u.id===sub.studentId),ass=get(K.ASSIGN).find(a=>a.id===sub.assignmentId);
const txt=`Student: ${stu?stu.name:'?'}\nAssignment: ${ass?ass.title:''}\nSubmitted: ${fmtDT(sub.submittedAt)}\n${sub.fileName?'File: '+sub.fileName:''}\n${sub.grade!==undefined?'Grade: '+sub.grade+'/'+ass.marks:''}\n\n--- Answer ---\n${sub.answer||'(none)'}`;
const b=new Blob([txt],{type:'text/plain'}),url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=`sub_${stu?stu.username:''}_.txt`;a.click();URL.revokeObjectURL(url);toast('Downloaded!','success')}

function openGradeModal(subId,title,marks){document.getElementById('grade-sub-id').value=subId;document.getElementById('grade-info').textContent=`${title} (out of ${marks})`;document.querySelector('#form-grade input[name="marks"]').max=marks;openModal('modal-grade')}
function openAddCourseModal(){const u=get(K.USERS);document.getElementById('course-teacher-select').innerHTML=u.filter(x=>x.role==='teacher').map(t=>`<option value="${t.id}">${t.name} (${t.subject})</option>`).join('');document.getElementById('course-student-select').innerHTML=u.filter(x=>x.role==='student').map(s=>`<option value="${s.id}">${s.name} — ${s.program||''}</option>`).join('');openModal('modal-add-course')}
function openEditCourse(cid){const c=get(K.COURSES).find(x=>x.id===cid);if(!c)return;const u=get(K.USERS);document.getElementById('edit-course-id').value=cid;document.getElementById('edit-course-name').textContent=c.name;
document.getElementById('edit-course-students').innerHTML=u.filter(x=>x.role==='student').map(s=>`<option value="${s.id}" ${c.studentIds.includes(s.id)?'selected':''}>${s.name} — ${s.program||''}</option>`).join('');openModal('modal-edit-course')}
function openAssignModal(){const u=me(),c=get(K.COURSES).filter(x=>x.teacherId===u.id);document.getElementById('assign-course-select').innerHTML=c.map(x=>`<option value="${x.id}">${x.name}</option>`).join('')||'<option value="">No classes</option>';openModal('modal-create-assignment')}
function openTopicModal(){const u=me(),c=get(K.COURSES).filter(x=>x.teacherId===u.id);document.getElementById('topic-course-select').innerHTML=c.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');openModal('modal-add-topic')}
function openNoteModal(){const u=me(),c=get(K.COURSES).filter(x=>x.teacherId===u.id);document.getElementById('note-course-select').innerHTML=c.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');openModal('modal-add-note')}
function openAttModal(){const u=me(),c=get(K.COURSES).filter(x=>x.teacherId===u.id);const sel=document.getElementById('att-course-select');sel.innerHTML=c.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
document.querySelector('#form-attendance input[name="date"]').value=new Date().toISOString().split('T')[0];
populateAttStudents();sel.addEventListener('change',populateAttStudents);openModal('modal-attendance')}
function populateAttStudents(){const cid=document.getElementById('att-course-select').value;const c=get(K.COURSES).find(x=>x.id===cid);const users=get(K.USERS);const box=document.getElementById('att-student-list');
if(!c){box.innerHTML='';return}
box.innerHTML=c.studentIds.map(sid=>{const s=users.find(u=>u.id===sid);return `<div class="att-item"><label><input type="checkbox" checked data-sid="${sid}"> ${s?s.name:'?'}</label></div>`}).join('')}
function openTTModal(){const c=get(K.COURSES);document.getElementById('tt-course-select').innerHTML=c.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');openModal('modal-timetable')}

/* ═══ INIT ═══ */
document.addEventListener('DOMContentLoaded',()=>{
seed();document.getElementById('topbar-date').textContent=fmtDate(new Date());
const u=me();if(u)showApp(u);else{document.getElementById('login-page').classList.remove('hide');document.getElementById('app').classList.add('hide')}

document.getElementById('login-form').addEventListener('submit',e=>{e.preventDefault();const un=document.getElementById('login-username').value.trim(),pw=document.getElementById('login-password').value,rl=document.querySelector('input[name="login-role"]:checked').value;
const f=get(K.USERS).find(x=>x.username===un&&x.password===pw&&x.role===rl);if(f){localStorage.setItem(K.ME,JSON.stringify(f));showApp(f);toast(`Welcome, ${f.name}!`,'success')}else toast('Invalid credentials. Admin must create your account first.','error')});
document.getElementById('btn-logout').addEventListener('click',logout);
document.getElementById('hamburger').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'));
document.getElementById('modal-overlay').addEventListener('click',closeAllModals);
document.querySelectorAll('.modal-close,[data-close]').forEach(b=>b.addEventListener('click',closeAllModals));

// FORMS
document.getElementById('form-add-teacher').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));const u=get(K.USERS);if(u.some(x=>x.username===fd.username)){toast('Username exists!','error');return}fd.role='teacher';fd.id='T'+(1000+u.filter(x=>x.role==='teacher').length+1);u.push(fd);put(K.USERS,u);e.target.reset();closeAllModals();toast(`Teacher created`,'success');renderView(currentView)});
document.getElementById('form-add-student').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));const u=get(K.USERS);if(u.some(x=>x.username===fd.username)){toast('Username exists!','error');return}fd.role='student';fd.id='S'+(2000+u.filter(x=>x.role==='student').length+1);u.push(fd);put(K.USERS,u);e.target.reset();closeAllModals();toast(`Student ${fd.name} created (ID: ${fd.id})`,'success');renderView(currentView)});
document.getElementById('form-add-course').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));const sids=Array.from(document.getElementById('course-student-select').selectedOptions).map(o=>o.value);const c=get(K.COURSES);c.push({id:'C'+Date.now(),name:fd.name,teacherId:fd.teacherId,studentIds:sids});put(K.COURSES,c);e.target.reset();closeAllModals();toast(`Class created with ${sids.length} students`,'success');renderView(currentView)});
document.getElementById('form-edit-course').addEventListener('submit',e=>{e.preventDefault();const cid=document.getElementById('edit-course-id').value;const sids=Array.from(document.getElementById('edit-course-students').selectedOptions).map(o=>o.value);const c=get(K.COURSES);const x=c.find(cc=>cc.id===cid);if(x){x.studentIds=sids;put(K.COURSES,c)}closeAllModals();toast('Updated!','success');renderView(currentView)});
document.getElementById('form-create-assignment').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));if(!fd.courseId){toast('Select a class','error');return}const u=me(),a=get(K.ASSIGN);a.push({id:'A'+Date.now(),courseId:fd.courseId,title:fd.title,desc:fd.description,due:new Date(fd.dueDate).toISOString(),marks:parseInt(fd.totalMarks),teacherId:u.id,created:new Date().toISOString()});put(K.ASSIGN,a);e.target.reset();closeAllModals();toast('Published!','success');renderView(currentView)});
document.getElementById('form-submit-assignment').addEventListener('submit',e=>{e.preventDefault();const aid=document.getElementById('submit-ass-id').value,ans=e.target.querySelector('textarea[name="answer"]').value,fi=document.getElementById('submit-file'),fn=fi.files.length?fi.files[0].name:null,u=me(),s=get(K.SUBS);
if(s.some(x=>x.assignmentId===aid&&x.studentId===u.id)){toast('Already submitted!','error');closeAllModals();return}s.push({id:'SUB'+Date.now(),assignmentId:aid,studentId:u.id,answer:ans,fileName:fn,submittedAt:new Date().toISOString()});put(K.SUBS,s);e.target.reset();closeAllModals();toast('Submitted! 🎉','success');renderView(currentView)});
document.getElementById('form-add-topic').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));const u=me(),o=get(K.OUTLINE);o.push({id:'O'+Date.now(),courseId:fd.courseId,title:fd.title,done:fd.completed==='on',teacherId:u.id});put(K.OUTLINE,o);e.target.reset();closeAllModals();toast('Added!','success');renderView(currentView)});
document.getElementById('form-add-note').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));const u=me(),n=get(K.NOTES);n.push({id:'N'+Date.now(),courseId:fd.courseId,title:fd.title,content:fd.content,teacherId:u.id,date:new Date().toISOString()});put(K.NOTES,n);e.target.reset();closeAllModals();toast('Posted!','success');renderView(currentView)});
document.getElementById('form-announcement').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));const a=get(K.ANN);a.push({id:'AN'+Date.now(),title:fd.title,content:fd.content,priority:fd.priority,date:new Date().toISOString(),by:me().id});put(K.ANN,a);e.target.reset();closeAllModals();toast('Announced!','success');renderView(currentView)});
document.getElementById('form-grade').addEventListener('submit',e=>{e.preventDefault();const sid=document.getElementById('grade-sub-id').value;const fd=Object.fromEntries(new FormData(e.target));const s=get(K.SUBS);const sub=s.find(x=>x.id===sid);if(sub){sub.grade=parseInt(fd.marks);sub.feedback=fd.feedback||'';put(K.SUBS,s)}e.target.reset();closeAllModals();toast('Graded!','success');renderView(currentView)});
document.getElementById('form-attendance').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));const checks=document.querySelectorAll('#att-student-list input[type="checkbox"]');const records=[];checks.forEach(ch=>records.push({studentId:ch.dataset.sid,present:ch.checked}));
const a=get(K.ATT);a.push({id:'ATT'+Date.now(),courseId:fd.courseId,date:fd.date,records});put(K.ATT,a);closeAllModals();toast('Attendance saved!','success');renderView(currentView)});
document.getElementById('form-timetable').addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(e.target));const t=get(K.TT);t.push({id:'TT'+Date.now(),courseId:fd.courseId,day:fd.day,startTime:fd.startTime,endTime:fd.endTime,room:fd.room});put(K.TT,t);e.target.reset();closeAllModals();toast('Added!','success');renderView(currentView)});
});

function logout(){localStorage.removeItem(K.ME);location.reload()}

function showApp(u){document.getElementById('login-page').classList.add('hide');document.getElementById('app').classList.remove('hide');
document.getElementById('sidebar-name').textContent=u.name;document.getElementById('sidebar-role').textContent=u.role;
document.getElementById('sidebar-avatar').src=`https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=0096b7&color=fff&bold=true`;
buildSidebar(u.role);navigateTo(MENUS[u.role][0].id)}
