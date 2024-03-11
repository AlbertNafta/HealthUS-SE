$(document).ready(function () {
    let page = 1;
    let keyword = '';
    let order = '';

    function generateUrl() {
        let url = `/hospital-list/query?page=${page}`;
        if (keyword !== '') {
            url += `&keyword=${keyword}`;
        }
        if (order !== '') {
            url += `&order=${order}`;
        }

        return url;
    }

    function loadPageWithQuery() {
        $.ajax({
            url: generateUrl(),
            type: 'GET',
            success: function (data) {
                // List
                const hospitalListContainer = $('#hospital-list .hospital-list-container');
                hospitalListContainer.empty();

                data.items.forEach(function (item, idx) {
                    const hospitalItem = $(`
                        <div class="hospital-item d-flex">
                            <div class="col-md-4 hospital-img">
                                <img src="${item.avatar}" alt="Image ${idx + 1}" class="img-fluid">
                            </div>
                            <div class="col-md-8 hospital-caption text-start">
                                <div class="hospital-title">
                                    <a class="text-decoration-none">${item.name}</a>
                                </div>
                                <div class="hospital-location">
                                    <p>By <a>${item.location}</a> | ${item.date}</p>
                                </div>
                                <div class="hospital-description">
                                    <p>${item.description}</p>
                                </div>
                                <div class="hospital-link">
                                    <a href="${item.website}" class="text-decoration-none text-end" style="font-size: 0.8rem;">Đọc thêm</a>
                                </div>
                            </div>
                        </div>
                    `);

                    hospitalListContainer.append(hospitalItem);
                });
    

                // Pagination
                const hosipitalListPgn = $('.hospital-list-pgn .pagination');
                hosipitalListPgn.empty();

                // console.log("Current page:", page);

                // console.log(data.totalPages);

                const prevIcon = $(`
                    <li class="pgn-control pgn-prev">
                        <a href="#" class="page-link">
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                `);

                const nextIcon = $(`
                    <li class="pgn-control pgn-next">
                        <a href="#" class="page-link">
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                `);

                hosipitalListPgn.append(prevIcon);

                for (let i = 1; i <= data.totalPages; i++) {
                    let pageItem = $(``);
                    // console.log(i);
                    if (i == page) {
                        pageItem = $(`
                            <li class="page-item active">
                                <a class="page-link" href="#">${i}</a>
                            </li>
                        `);    
                    }
                    else {
                        pageItem = $(`
                            <li class="page-item">
                                <a class="page-link" href="#">${i}</a>
                            </li>
                        `);
                    }
                    hosipitalListPgn.append(pageItem);
                }

                hosipitalListPgn.append(nextIcon);
            }
        });
    }


    // Pagination
    $('.hospital-list-pgn').on('click', '.page-item', function (e) {
        e.preventDefault();
        $('.page-item.active').removeClass('active');
        $(this).addClass('active');
        page = parseInt($(this).text());
        // console.log('Page:', page);
        loadPageWithQuery();
    });

    $('.hospital-list-pgn').on('click', '.pgn-control', function (e) {
        e.preventDefault();
        const activePage = $('.hospital-list-pgn .page-item.active');
        const nextPage = activePage.next();
        const prevPage = activePage.prev();

        if ($(this).hasClass('pgn-prev')) {
            if (prevPage.length > 0 && prevPage.hasClass('page-item')) {
                activePage.removeClass('active');
                prevPage.addClass('active');
                page--;
                loadPageWithQuery();
            }
        } else {
            if (nextPage.length > 0 && nextPage.hasClass('page-item')) {
                activePage.removeClass('active');
                nextPage.addClass('active');
                page++;
                loadPageWithQuery();
            }
        }
    });


    // Search
    $('.search-icon').on('click', function(e) {
        e.preventDefault();
        performSearch();
    });

    $('#search-input').on('keyup', function(event) {
        performSearch();
    });

    function performSearch() {
        const searchTerm = $('#search-input').val().trim();
        if (searchTerm !== '') {
            console.log('Searching for:', searchTerm);
            keyword = searchTerm;
            loadPageWithQuery();
        } else {
            console.log('Empty search term');
            keyword = '';
            // loadPageWithQuery();
        }
    }

    // Sort
    $('#hospital-list .dropdown-menu .dropdown-item').on('click', function(e) {
        e.preventDefault();
        const option = $(this).text();
        
        if (option === 'Tăng dần theo tên') {
            order = 'asc';
        }
        else if (option === 'Giảm dần theo tên') {
            console.log('desc');
            order = 'desc';
        }
        else {
            order = ''; 
        }

        loadPageWithQuery();
    });
});
