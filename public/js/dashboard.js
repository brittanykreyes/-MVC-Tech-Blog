const allDeleteBlog = document.querySelectorAll(".delete-blog");

for (let i = 0; i < allDeleteBlog.length; i++) {
    allDeleteBlog[i].addEventListener("submit", function(event) { 
        event.preventDefault();


        const id = event.target.id.split("-")[2]

        fetch(`/api/blogs/${id}`, {
            method: "DELETE",
        })
        .then(res => {
            console.log("Blog has been deleted!");

            window.location.href = "/dashboard"
        })
    })
    
}