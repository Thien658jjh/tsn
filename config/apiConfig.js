let API = ['api', 'v1.0'], // Config API: 0 => Base URL, 1 => Version
    CONFIG_API = {
        // API Security
        __API_AUTHOR: 'STEVIE_658JJH__APPLICATION__V1.0',
        __API_KEY: 'wx0z34ajQVSsdF35m5xdhZa7ygStlAbRVnfNC',
        __API_SECRET: 'iP]Y@!_zP@$dfGnAnxvKgy;C58#z=}D9YzS(Z',
        __KEY_UPLOAD: '28sj2j402H92Js2sh72NM2si12su',
        __MY_MAC_ID1: '40-8D-5C-66-40-9A',
        __MY_MAC_ID2: 'DC-85-DE-FC-C5-69',
        __MY_MAC_ID3: '00-50-56-C0-00-08',

        // Link API
        __link_user: API[0] + '/' + API[1] + '/user/', // USER
        __link_story: API[0] + '/' + API[1] + '/story/', // STORY

        // Link Admin
        __link_admin: '/admin-panel',

        // Link reset password
        __link_reset_password: '/auth/reset-password/?access_token=',
        __route_reset_password: '/auth/reset-password',
        __link_upload_new_story: '/uploadstory',

        // MongoDB Config
        __database_name: 'TruyenSongNgu',

        // Port app server
        __port_server: 80, // 80 if public to IP address

        // IP adress server
        __ip_server: 'http://45.77.43.246', //45.77.43.246

        // Email app config
        __gmail_user: 'nguyenthanhthien.658jjh@gmail.com',
        __gmail_pass: 'Zmx5c2hvcA28',
        __gmail_subject: '[FLY SHOP] KHÔI PHỤC MẬT KHẨU TÀI KHOẢN!',
        __gmail_subject_done: '[FLY SHOP] THAY ĐỔI MẬT KHẨU THÀNH CÔNG!'
    }

exports.CONFIG_API = CONFIG_API