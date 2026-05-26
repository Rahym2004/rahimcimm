
function Book(title, author, price, rating, category) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.rating = rating;
    this.category = category;
}


const allBooks = [
    new Book("人间失格", "太宰治", 45, 5, "小说"),
    new Book("活着", "余华", 50, 5, "小说"),
    new Book("围城", "钱钟书", 39, 4, "文学"),
    new Book("追风筝的人", "卡勒德·胡赛尼", 55, 5, "小说"),
    new Book("红高粱家族", "莫言", 50, 5, "历史"),
    new Book("三体", "刘慈欣", 39, 5, "科幻"),
    new Book("平凡的世界", "路遥", 55, 5, "故事"),
    new Book("西游记", "吴承恩", 50, 4, "神话")
];


const userSession = {
    isLoggedIn: false,
    username: ""
};

const searchInput = document.getElementById("searchInput"); // 1. getElementById
const bookContainer = document.querySelector(".books");       // 2. querySelector
const mainHeader = document.getElementsByTagName("h2")[0];   // 3. getElementsByTagName
const navLinks = document.querySelectorAll(".left li");      // 4. querySelectorAll


searchInput.addEventListener("input", function() {
    const keyword = this.value.toLowerCase().trim();
    
    
    bookContainer.innerHTML = ""; 

    allBooks.forEach(book => {
        
        if (book.title.includes(keyword) || book.author.includes(keyword) || book.category.includes(keyword)) {
            
            
            const card = document.createElement("div");
            card.className = "book-card";
            
            
            card.innerHTML = `
                <div class="book-inner">
                    <div class="book-front">
                        <p style="font-weight:bold; margin-top:60px; font-size:18px;">${book.title}</p >
                        <p style="color:#666;">${book.author}</p >
                        <span style="color:#ff9900; font-weight:bold;">￥${book.price}</span>
                    </div>
                    <div class="book-back">
                        <h4>${book.title}</h4>
                        <p style="font-size:12px;">Kategoriýa: ${book.category}</p >
                        <p style="color:#ff9900;">评分: ★ ${book.rating}</p >
                        <button style="width:80%; margin-top:10px;">购买</button>
                    </div>
                </div>
            `;
            
            
            card.style.opacity = "0";
            bookContainer.appendChild(card);
            
            
            setTimeout(() => { card.style.opacity = "1"; }, 10);
        }
    });
});


const ruInput = document.getElementById("ru");
const rpInput = document.getElementById("rp");
const strengthText = document.getElementById("strengthText");
const uError = document.getElementById("uError");


function validateUserFormat(val) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^1[3-9]\d{9}$/; 
    return emailRegex.test(val) || phoneRegex.test(val);
}


rpInput.addEventListener("input", function() {
    const val = this.value;
    if (val.length === 0) {
        strengthText.innerText = "无";
        strengthText.style.color = "black";
    } else if (val.length < 5) {
        strengthText.innerText = "弱 (Gowşak)";
        strengthText.style.color = "red";
    } else if (val.length < 9) {
        strengthText.innerText = "中 (Orta)";
        strengthText.style.color = "orange";
    } else {
        strengthText.innerText = "强 (Güýçli)";
        strengthText.style.color = "green";
    }
});


window.registerUser = function() {
    const u = ruInput.value.trim();
    const p = rpInput.value;

    
    if (!validateUserFormat(u)) {
        uError.innerText = "Nädogry e-mail ýa-da Telefon belgisi!";
        return;
    } else {
        uError.innerText = "";
    }

    if (u && p) {
        localStorage.setItem("savedUser", u);
        localStorage.setItem("savedPass", p);
        alert("注册成功！谢谢。Hasaba alyndy! Maglumatlar LocalStorage-e ýazyldy.");
        showLogin();
    } else {
        alert("Haýyş, ähli meýdançalary dolduryň!");
    }
};


window.login = function() {
    const u = document.getElementById("u").value;
    const p = document.getElementById("p").value;

    if (u === localStorage.getItem("savedUser") && p === localStorage.getItem("savedPass")) {
        alert("Giriş üstünlikli! Hoş geldiňiz,  " + u);
        userSession.isLoggedIn = true;
        userSession.username = u;
        document.getElementById("box").style.display = "none";
    } else {
        alert("Ulanyjy ady ýa-da parol ýalňyş! Haýyş ýene-de synanyşyň!");
    }
};