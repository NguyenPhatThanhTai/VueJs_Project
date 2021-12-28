<template>
    <header id="AdmHeader">
        <h2>
            <label for="nav-toggle">
                <span class="las la-bars"></span>
            </label> Đọc sách
        </h2>
        <div class="search-wrapper">
            <span class="las la-search"></span>
            <input type="search" placeholder="Search here" />
        </div>
        <div class="user-wrapper">
            <img src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/9/7/photo-1-16310152604821794731420.jpg" width="30px" height="30px" alt="">
            <div>
                <h4>Đức nè</h4>
                <small>Super admin</small>
            </div>
        </div>
    </header>
</template>

<style>
#nav-toggle:checked~.main-content #AdmHeader {
    width: calc(100% - 70px);
    left: 70px;
}

#AdmHeader {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    left: 345px;
    width: calc(100% - 345px);
    top: 0;
    z-index: 100;
    transition: left 300ms;
}


#AdmHeader h2 {
    color: #222;
}

#AdmHeader label span {
    font-size: 1.7rem;
    padding-right: 1rem;
}

@media only screen and (max-width: 1200px) {
    .main-content #AdmHeader {
        width: calc(100% - 70px);
        left: 70px;
    }
}

@media only screen and (max-width: 768px) {
    #AdmHeader h2 {
        display: flex;
        align-items: center;
    }
    #AdmHeader h2 label {
        display: inline-block;
        background: var(--main-color);
        padding-right: 0rem;
        margin-right: 1rem;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center !important;
    }
    #AdmHeader h2 span {
        text-align: center;
        padding-right: 0rem;
    }
    #AdmHeader h2 {
        font-size: 1.1rem;
    }
    #AdmHeader {
        width: 100% !important;
        left: 0 !important;
    }
}
</style>