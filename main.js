// Gọi hàm load khi chạy
LoadData();

// GET: domain:port/posts
// GET: domain:port/posts/id
async function LoadData() {
    try {
        const data = await fetch('http://localhost:3000/posts');
        const posts = await data.json();
        for (const post of posts) {
            let body = document.getElementById("body");
            body.innerHTML += convertDataToHTML(post);
        }
    } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
    }
}

// Hàm này cũ dùng promise -> có thể xoá hoặc đổi tương tự
async function LoadDataA() {
    try {
        const data = await fetch('http://localhost:3000/posts');
        const posts = await data.json();
        for (const post of posts) {
            let body = document.getElementById("body");
            body.innerHTML += convertDataToHTML(post);
        }
    } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
    }
}

function convertDataToHTML(post) {
    let result = "<tr>";
    result += "<td>" + post.id + "</td>";
    result += "<td>" + post.title + "</td>";
    result += "<td>" + post.views + "</td>";
    result += "<td><input type='submit' value='Delete' onclick='Delete(" + post.id + ")'></input></td>";
    result += "</tr>";
    return result;
}

// POST + PUT: domain:port/posts + body
async function SaveData() {
    try {
        let id = document.getElementById("id").value;
        let title = document.getElementById("title").value;
        let view = document.getElementById("view").value;

        // Kiểm tra xem có tồn tại id chưa
        const check = await fetch("http://localhost:3000/posts/" + id);

        if (check.ok) {
            // Nếu có -> PUT (update)
            let dataObj = {
                title: title,
                views: view
            };

            const res = await fetch('http://localhost:3000/posts/' + id, {
                method: 'PUT',
                body: JSON.stringify(dataObj),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Update:", res.status);
        } else {
            // Nếu chưa có -> POST (tạo mới)
            let dataObj = {
                id: id,
                title: title,
                views: view
            };

            const res = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                body: JSON.stringify(dataObj),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Create:", res.status);
        }
    } catch (err) {
        console.error("Lỗi khi lưu dữ liệu:", err);
    }
}

// DELETE: domain:port/posts/id
async function Delete(id) {
    try {
        await fetch('http://localhost:3000/posts/' + id, {
            method: 'DELETE'
        });
        console.log("Delete thành công");
    } catch (err) {
        console.error("Lỗi khi delete:", err);
    }
}
