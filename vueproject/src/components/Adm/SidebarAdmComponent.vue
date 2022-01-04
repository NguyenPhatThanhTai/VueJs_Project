<template>
    <div class="sidebar">
        <div class="sidebar-brand">
            <h2><span class="lab la-accusoft"></span><span>Đọc sách</span></h2>
        </div>
        <div class="sidebar-menu">
            <ul>
                <li>
                    <a href="/Adm/BookManagment"><span class="las la-igloo"></span>
                    <span>Quản lý sách</span></a>
                </li>
                <li>
                    <a href="/Adm/AuthorManagment"><span class="las la-user"></span>
                    <span>Quản lý tác giả</span></a>
                </li>
                <li>
                    <a href="/Adm/CategoryManagment"><span class="las la-clipboard-list"></span>
                    <span>Quản lý chủ đề</span></a>
                </li>
                <li>
                    <a href="/Adm/PublisherManagment"><span class="las la-shopping-bag"></span>
                    <span>Quản lý nhà xuất bản</span></a>
                </li>
                <li>
                    <a href=""><span class="las la-receipt"></span>
                    <span>Quản lý người dùng</span></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
    .sidebar {
        width: 345px;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        background: var(--main-color);
        z-index: 100;
        transition: width 300ms;
    }

    .sidebar-brand {
        height: 90px;
        padding: 1rem 0rem 1rem 2rem;
        color: #fff;
    }

    .sidebar-brand span {
        display: inline-block;
        padding-right: 1rem;
    }

    .sidebar-menu {
        margin-top: 1rem;
    }

    .sidebar-menu li {
        width: 100%;
        margin-bottom: 1.7rem;
        padding-left: 2rem;
    }

    .sidebar-menu a {
        display: block;
        color: #fff;
        font-size: 1.2rem;
    }

    .sidebar-menu a.active {
        background: #fff;
        padding-top: 1rem;
        padding-bottom: 1rem;
        color: var(--main-color);
        border-radius: 30px 0px 0px 30px;
    }

    .sidebar-menu a span:first-child {
        font-size: 1.5rem;
        padding-right: 1rem;
    }

    #nav-toggle:checked+.sidebar {
        width: 70px;
    }

    #nav-toggle:checked+.sidebar .sidebar-brand,
    #nav-toggle:checked+.sidebar li {
        padding-left: 1rem;
        text-align: center;
    }

    #nav-toggle:checked+.sidebar li a {
        padding-left: 0rem;
    }

    #nav-toggle:checked+.sidebar .sidebar-brand h2 span:last-child,
    #nav-toggle:checked+.sidebar li a span:last-child {
        display: none;
    }

    @media only screen and (max-width: 1200px) {
        .sidebar {
            width: 70px;
        }
        .sidebar .sidebar-brand,
        .sidebar li {
            padding-left: 1rem;
            text-align: center;
        }
        .sidebar li a {
            padding-left: 0rem;
        }
        .sidebar .sidebar-brand h2 span:last-child,
        .sidebar li a span:last-child {
            display: none;
        }
    }

    @media only screen and (max-width: 768px) {
        .sidebar {
            left: -100% !important;
        }

            #nav-toggle:checked+.sidebar {
            left: 0 !important;
            z-index: 100;
            width: 345px;
        }
        #nav-toggle:checked+.sidebar .sidebar-brand,
        #nav-toggle:checked+.sidebar li {
            padding-left: 2rem;
            text-align: left;
        }
        #nav-toggle:checked+.sidebar li a {
            padding-left: 1rem;
        }
        #nav-toggle:checked+.sidebar .sidebar-brand h2 span:last-child,
        #nav-toggle:checked+.sidebar li a span:last-child {
            display: inline;
    }
    }
</style>