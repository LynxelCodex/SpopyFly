/* ===================================================================
   SPOTIFY CLONE - script.js with YouTube Search
=================================================================== */

// YouTube API Key - Add your own key here from https://console.developers.google.com
const YOUTUBE_API_KEY = 'AIzaSyCwciHt_mhdeGVeF4DYHKxYQAJ2a24uFTc'; // Replace with your YouTube API key

// Load songs from localStorage, fallback to default
let songs = JSON.parse(localStorage.getItem('spotifyCloneSongs')) || [
  // ---------------- DIONELA ----------------
  { title: 'Sining', artist: 'Dionela feat. Jay R', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Sining', youtubeVideoID: 'Au6NULHAPXU' },
  { title: 'Musika', artist: 'Dionela', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Musika', youtubeVideoID: 'J3e3mC0G3Gk' },
  { title: 'Oksihina', artist: 'Dionela', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Oksihina', youtubeVideoID: 'jwnsMH1OSCA' },
  { title: '153', artist: 'Dionela', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=153', youtubeVideoID: 'OcFU6BphLj4' },
  { title: 'Suyo', artist: 'Dionela', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Suyo', youtubeVideoID: 'YwPFNmk82Z4' },
  { title: 'Bahaghari', artist: 'Dionela', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Bahaghari', youtubeVideoID: 'nJl5oMnGe7A' },
  { title: 'Tanging Akin', artist: 'Dionela', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Tanging+Akin', youtubeVideoID: 'Au6NULHAPXU' },

  // ---------------- JAY R ----------------
  { title: 'Bakit Pa Ba', artist: 'Jay R', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Bakit+Pa+Ba', youtubeVideoID: 'Ntp1KgBMqAE' },
  { title: 'Design', artist: 'Jay R', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Design', youtubeVideoID: 'yOEJvZNREYk' },
  { title: "Ngayo'y Naririto", artist: 'Jay R', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ngayoy+Naririto', youtubeVideoID: 'cUgJwq6IGPI' },
  { title: 'Kung Mahal Mo Siya', artist: 'Jay R', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Kung+Mahal+Mo+Siya', youtubeVideoID: '1fT2F_D08vM' },
  { title: "Laging Naro'n Ka", artist: 'Jay R', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Laging+Naron+Ka', youtubeVideoID: 'VIvqVs8_IJ0' },
  { title: 'No One Else Comes Close', artist: 'Jay R', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=No+One+Else', youtubeVideoID: '0qg4_Bf_n7w' },

  // ---------------- HEV ABI ----------------
  { title: 'Alam Mo Ba Girl', artist: 'Hev Abi', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Alam+Mo+Ba+Girl', youtubeVideoID: 'c5s7t302G-8' },
  { title: 'Walang Alam', artist: 'Hev Abi', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Walang+Alam', youtubeVideoID: 'K48VbO1_U1c' },
  { title: 'Welcome2DTQ', artist: 'Hev Abi', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Welcome2DTQ', youtubeVideoID: 't-dM1t_G1jM' },
  { title: 'Para Sa Street', artist: 'Hev Abi', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Para+Sa+Street', youtubeVideoID: 'G13m702lB3M' },
  { title: 'Sumugal', artist: 'Hev Abi', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Sumugal', youtubeVideoID: 'xG-3sT-V0b4' },
  { title: 'LK', artist: 'Hev Abi', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=LK', youtubeVideoID: 'rN9Lw49x6gQ' },
  { title: 'Pasensya', artist: 'Hev Abi', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Pasensya', youtubeVideoID: 'zLqbJMbCJRk' },

  // ---------------- DENISE JULIA ----------------
  { title: 'B.A.D.', artist: 'Denise Julia feat. P-Lo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=B.A.D.', youtubeVideoID: 'P5Wj2tKx_4w' },
  { title: 'NVMD', artist: 'Denise Julia', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=NVMD', youtubeVideoID: 'uH-KjJ0Wf-o' },
  { title: 'bum 2 me', artist: 'Denise Julia', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=bum+2+me', youtubeVideoID: 'L3U9dK5v-Z0' },
  { title: "Sugar n' Spice", artist: 'Denise Julia', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Sugar+n+Spice', youtubeVideoID: 'WP61j0TXPAM' },
  { title: "Lackin'", artist: 'Denise Julia', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Lackin', youtubeVideoID: 'G9v_QvW9e-0' },
  { title: 'Boy Toy', artist: 'Denise Julia', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Boy+Toy', youtubeVideoID: 'n2OhXERnCbs' },

  // ---------------- P-LO ----------------
  { title: "Put Me On Somethin'", artist: 'P-Lo feat. E-40', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Put+Me+On', youtubeVideoID: 'U-uadpyaPU8' },
  { title: 'Same Squad', artist: 'P-Lo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Same+Squad', youtubeVideoID: '0SeZHOqSsZA' },
  { title: 'Sneeze', artist: 'P-Lo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Sneeze', youtubeVideoID: 'RKzXXgmAYr8' },
  { title: 'About It', artist: 'P-Lo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=About+It', youtubeVideoID: 'DyLaVrFkGfU' },

  // ---------------- ZACK TABUDLO ----------------
  { title: 'Gusto', artist: 'Zack Tabudlo & Al James', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Gusto', youtubeVideoID: 'UlYFnwuuiTc' },
  { title: 'Binibini', artist: 'Zack Tabudlo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Binibini', youtubeVideoID: 'DhzDmhytrTI' },
  { title: 'Pano', artist: 'Zack Tabudlo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Pano', youtubeVideoID: 'mnrSOA_QZm4' },
  { title: 'Nangangamba', artist: 'Zack Tabudlo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Nangangamba', youtubeVideoID: 'W2Q47P6q6_o' },
  { title: 'Asan Ka Na Ba', artist: 'Zack Tabudlo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Asan+Ka+Na+Ba', youtubeVideoID: '5V8yv2pZf1A' },
  { title: 'Give Me Your Forever', artist: 'Zack Tabudlo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Give+Me+Your', youtubeVideoID: 'f0s6oG2J-nI' },
  { title: 'Fallin', artist: 'Zack Tabudlo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Fallin', youtubeVideoID: 'DGpzBOSiyxY' },
  { title: 'Yakap', artist: 'Zack Tabudlo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Yakap', youtubeVideoID: 'LsN5XIMQYVY' },
  { title: 'Habang Buhay', artist: 'Zack Tabudlo', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Habang+Buhay', youtubeVideoID: 'RkX3iiI317k' },

  // ---------------- AL JAMES ----------------
  { title: 'Pahinga', artist: 'Al James', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Pahinga', youtubeVideoID: 'aG3l7g7m8Wk' },
  { title: 'Ngayon Lang', artist: 'Al James', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ngayon+Lang', youtubeVideoID: 'QfnBpb6lRoA' },
  { title: 'Pa-Umaga', artist: 'Al James', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Pa-Umaga', youtubeVideoID: 'h3y95x-aC-I' },
  { title: 'Latigo', artist: 'Al James', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Latigo', youtubeVideoID: '2G-TqB8HjFw' },
  { title: 'Atin-Atin Lang', artist: 'Al James', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Atin-Atin+Lang', youtubeVideoID: 'Vb27o7o5Hh0' },
  { title: 'PSG', artist: 'Al James', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=PSG', youtubeVideoID: 'IhNifdQf5Oo' },

  // ---------------- MAKI ----------------
  { title: 'Dilaw', artist: 'Maki', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Dilaw', youtubeVideoID: '0_X0J9y34c0' },
  { title: 'Saan?', artist: 'Maki', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Saan', youtubeVideoID: '37k-7Z5rL6A' },
  { title: 'Namumula', artist: 'Maki', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Namumula', youtubeVideoID: 'hR-vO1O0L4A' },
  { title: 'Bakit?', artist: 'Maki', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Bakit', youtubeVideoID: '7TfJ2f8Tf8Q' },
  { title: 'Kailan?', artist: 'Maki', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Kailan', youtubeVideoID: 'CdBrlHkb5pY' },
  { title: 'HBD', artist: 'Maki', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=HBD', youtubeVideoID: 'fHqLRrqx3Rk' },
  { title: 'Sikulo', artist: 'Maki', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Sikulo', youtubeVideoID: 'E7e4ILjfHsI' },

  // ---------------- BINI ----------------
  { title: 'Pantropiko', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Pantropiko', youtubeVideoID: 'UfGJgN3lYBU' },
  { title: 'Salamin, Salamin', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Salamin+Salamin', youtubeVideoID: 'xPFI6fps8jY' },
  { title: 'Karera', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Karera', youtubeVideoID: '-6IGDmoqMSc' },
  { title: 'Lagi', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Lagi', youtubeVideoID: 'mtQH9Vc0kl4' },
  { title: 'Na Na Na', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Na+Na+Na', youtubeVideoID: 'Z82-WwY828k' },
  { title: 'Cherry On Top', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Cherry+On+Top', youtubeVideoID: 'PSuQLueZIRY' },
  { title: 'Huwag Muna Tayong Umuwi', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Huwag+Muna', youtubeVideoID: 'yQe6gXJmXqU' },
  { title: 'I Feel Good', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=I+Feel+Good', youtubeVideoID: 'V14vX9L0y1Y' },
  { title: 'Born to Win', artist: 'BINI', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Born+To+Win', youtubeVideoID: '4n34_Z05hWk' },

  // ---------------- CUP OF JOE ----------------
  { title: 'Tingin', artist: 'Cup of Joe & Janine Teñoso', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Tingin', youtubeVideoID: 'j5hcNbbpWQk' },
  { title: 'Misteryoso', artist: 'Cup of Joe', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Misteryoso', youtubeVideoID: 'Bm3xGPFh4FU' },
  { title: 'Ikaw Pa Rin Ang Pipiliin Ko', artist: 'Cup of Joe', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ikaw+Pa+Rin', youtubeVideoID: 'f_LIJMUiA5E' },
  { title: 'Estranghero', artist: 'Cup of Joe', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Estranghero', youtubeVideoID: 'P5e-5DV8_D8' },
  { title: 'Mananatili', artist: 'Cup of Joe', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Mananatili', youtubeVideoID: 'JJ-JijHnlNQ' },
  { title: 'Patutunguhan', artist: 'Cup of Joe', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Patutunguhan', youtubeVideoID: '17_jT4D1F-Y' },
  { title: 'Sagada', artist: 'Cup of Joe', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Sagada', youtubeVideoID: 'w2c7Z543uYk' },
  { title: 'Wag Na Lang', artist: 'Cup of Joe', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Wag+Na+Lang', youtubeVideoID: 'Wz_P2L6dZ6M' },

  // ---------------- JANINE TEÑOSO ----------------
  { title: "'Di Na Muli", artist: 'Janine Teñoso', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Di+Na+Muli', youtubeVideoID: 'm1r07bnaBbM' },
  { title: 'Pelikula', artist: 'Janine Teñoso feat. Arthur Nery', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Pelikula', youtubeVideoID: '20hR5c1R2_8' },
  { title: 'Tag-araw', artist: 'Janine Teñoso', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Tag-Araw', youtubeVideoID: 'DqlLU2cupro' },
  { title: 'Umibig Muli', artist: 'Janine Teñoso', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Umibig+Muli', youtubeVideoID: 'e1P_n1x-5uQ' },
  { title: 'Hulaan', artist: 'Janine Teñoso', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Hulaan', youtubeVideoID: 'aE5yqFq8PjQ' },

  // ---------------- OVER OCTOBER ----------------
  { title: 'Ikot', artist: 'Over October', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ikot', youtubeVideoID: 'R_Q0B6L5Z5Q' },
  { title: 'Ating Dalawa', artist: 'Over October', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ating+Dalawa', youtubeVideoID: 'c6W6_12y9aI' },
  { title: 'Sandali Lang', artist: 'Over October', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Sandali+Lang', youtubeVideoID: 'U_7i5f5W8Gk' },
  { title: 'Arbitrary', artist: 'Over October', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Arbitrary', youtubeVideoID: 'R9-2uW7327E' },
  { title: 'Never Stop', artist: 'Over October', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Never+Stop', youtubeVideoID: 'F3aJkKzK7Y8' },
  { title: 'Wait', artist: 'Over October', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Wait', youtubeVideoID: 'Qh_a18GgXv0' },
  { title: 'Intertwine', artist: 'Over October', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Intertwine', youtubeVideoID: 'i9X1dK8sO_A' },

  // ---------------- ROB DENIEL ----------------
  { title: 'RomCom', artist: 'Rob Deniel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=RomCom', youtubeVideoID: 'kYJ5o-v3vT4' },
  { title: 'Ulap', artist: 'Rob Deniel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ulap', youtubeVideoID: 'nXOe-p94AQI' },
  { title: 'Miss Miss', artist: 'Rob Deniel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Miss+Miss', youtubeVideoID: 'aG-n9D6m5y0' },
  { title: 'Ang Pag-ibig', artist: 'Rob Deniel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ang+Pag-ibig', youtubeVideoID: '8KIHE226YXM' },
  { title: 'Sinta', artist: 'Rob Deniel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Sinta', youtubeVideoID: 'Zf09xJ5D090' },
  { title: 'Gabi', artist: 'Rob Deniel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Gabi', youtubeVideoID: 'F3S019h7-2Q' },
  { title: 'Darling', artist: 'Rob Deniel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Darling', youtubeVideoID: 'I8nKyd7kxlE' },

  // ---------------- ARTHUR MIGUEL ----------------
  { title: 'Lihim', artist: 'Arthur Miguel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Lihim', youtubeVideoID: '-trPbcsJ9O4' },
  { title: 'Ang Wakas', artist: 'Arthur Miguel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ang+Wakas', youtubeVideoID: 'q-8wJ9J3a4c' },
  { title: 'Dito', artist: 'Arthur Miguel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Dito', youtubeVideoID: '8Pj6Yv7wQvI' },
  { title: 'Paano?', artist: 'Arthur Miguel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Paano', youtubeVideoID: 'y0r_aXhS_64' },
  { title: 'Isa lang', artist: 'Arthur Miguel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Isa+Lang', youtubeVideoID: 'XL3QTHG2tVI' },
  { title: 'Tadhana', artist: 'Arthur Miguel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Tadhana', youtubeVideoID: '8u9fM7wQx5U' },
  { title: 'Kupido', artist: 'Arthur Miguel', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Kupido', youtubeVideoID: 'h_7aW9vN2m1' },

  // ---------------- TJ MONTERDE ----------------
  { title: 'Palagi', artist: 'TJ Monterde', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Palagi', youtubeVideoID: 'v82VtUUGFqk' },
  { title: 'Dating Tayo', artist: 'TJ Monterde', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Dating+Tayo', youtubeVideoID: 'r4f_pzRm058' },
  { title: 'Tulad Mo', artist: 'TJ Monterde', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Tulad+Mo', youtubeVideoID: 'fCUa7vxhgKo' },
  { title: 'Ikaw At Ako', artist: 'TJ Monterde', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Ikaw+At+Ako', youtubeVideoID: 'hifLWrMh-T4' },
  { title: 'Mahika', artist: 'TJ Monterde', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Mahika', youtubeVideoID: 'gQqc4EItqxU' },
  { title: 'Karera', artist: 'TJ Monterde', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Karera', youtubeVideoID: 'HZL617BHIxI' },
  { title: 'Kahit Kunwari', artist: 'TJ Monterde', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Kahit+Kunwari', youtubeVideoID: 'v4d-rZ2N3Gg' },

  // ---------------- SUNKISSED LOLA ----------------
  { title: 'Pasilyo', artist: 'SunKissed Lola', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Pasilyo', youtubeVideoID: 'XToA-1dZYWA' },
  { title: 'Makikita Ba Ang Kislap', artist: 'SunKissed Lola', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Makikita+Ba', youtubeVideoID: 'RHlyGzWo0Lk' },
  { title: 'Damag', artist: 'SunKissed Lola', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Damag', youtubeVideoID: '1j7y-D2-qI8' },
  { title: 'Pakiusap', artist: 'SunKissed Lola', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Pakiusap', youtubeVideoID: '6XQ46Fv2_aY' },
  { title: 'HKM', artist: 'SunKissed Lola', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=HKM', youtubeVideoID: 'iVz68K_Q4G0' },
  { title: 'Dalangin', artist: 'SunKissed Lola', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Dalangin', youtubeVideoID: 'f3PzLxE7GKY' },
  { title: 'White Toyota', artist: 'SunKissed Lola', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=White+Toyota', youtubeVideoID: 'y0Vb_mZq71w' },
  { title: 'Paki Sabi', artist: 'SunKissed Lola', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Paki+Sabi', youtubeVideoID: '6hOFULDlu6A' },

  // ---------------- BEN&BEN ----------------
  { title: 'Kathang Isip', artist: 'Ben&Ben', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Kathang+Isip', youtubeVideoID: 'sKa8HtWgOxk' },
  { title: 'Leaves', artist: 'Ben&Ben', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Leaves', youtubeVideoID: 'WOQ1t_u8HTw' },
  { title: 'Maybe The Night', artist: 'Ben&Ben', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Maybe+The+Night', youtubeVideoID: 'hJhVURhdLEg' },

  // ---------------- IV OF SPADES ----------------
  { title: 'Mundo', artist: 'IV of Spades', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Mundo', youtubeVideoID: 'omFa4Yk9Fmg' },
  { title: 'Come Inside Of My Heart', artist: 'IV of Spades', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Come+Inside', youtubeVideoID: 'HxwokFPIguU' },

  // ---------------- MOIRA DELA TORRE ----------------
  { title: 'Malaya', artist: 'Moira Dela Torre', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Malaya', youtubeVideoID: 'UPJCS3TPQDA' },

  // ---------------- DECEMBER AVENUE ----------------
  { title: "Kung 'Di Rin Lang Ikaw", artist: 'December Avenue', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Kung+Di+Rin', youtubeVideoID: 'P1pwbnzbe7g' },
  { title: 'Huling Sandali', artist: 'December Avenue', coverImageURL: 'https://placehold.co/600x600/282828/FFF?text=Huling+Sandali', youtubeVideoID: 'MyMmB7vnO9c' }
];

// Save songs to localStorage
const PLAYLIST_VERSION = 'filipino-vibes-v2';
if (localStorage.getItem('playlistVersion') !== PLAYLIST_VERSION) {
  localStorage.removeItem('spotifyCloneSongs');
  localStorage.setItem('playlistVersion', PLAYLIST_VERSION);
  // Reload songs from default
  songs = JSON.parse(localStorage.getItem('spotifyCloneSongs')) || songs;
}

function saveSongs() {
  localStorage.setItem('spotifyCloneSongs', JSON.stringify(songs));
}

// Add new song to permanent list
function addSongToLibrary(song) {
  const exists = songs.some(s => s.youtubeVideoID === song.youtubeVideoID);
  if (!exists) {
    songs.push(song);
    saveSongs();
    renderTrackGrid();
    renderLibraryList();
    renderArtistGrid();
  }
}

function handleYouTubeTrackClick(song) {
  addSongToLibrary(song);
  const trackIndex = songs.findIndex(s => s.youtubeVideoID === song.youtubeVideoID);
  if (trackIndex !== -1) {
    loadTrack(trackIndex);
    generateRecommendations(trackIndex);
  }
}

// Search YouTube for songs
async function searchYouTube(query) {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not set');
    return [];
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&maxResults=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) return [];

    return data.items.map(item => ({
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      coverImageURL: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url || 'https://via.placeholder.com/226',
      youtubeVideoID: item.id.videoId
    }));
  } catch (error) {
    console.error('YouTube search error:', error);
    return [];
  }
}

/* === STATE === */
const state = {
  currentTrackIndex: -1,
  isPlaying: false,
  volume: 70,
  isMuted: false,
  isShuffle: false,
  isRepeat: false,
  isLiked: false,
  progressInterval: null,
  ytReady: false,
  recentlyPlayed: [],
  currentArtistIndices: []
};

let ytPlayer = null;
let viewHistory = ['home'];

/* === YOUTUBE API === */
(function loadYTApi() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    height: '100%',
    width: '100%',
    playerVars: { autoplay: 0, controls: 1, disablekb: 0, enablejsapi: 1, modestbranding: 1, rel: 0, showinfo: 0, fs: 1 },
    events: {
      onReady: () => { state.ytReady = true; setVolume(state.volume); },
      onStateChange: onPlayerStateChange,
      onError: onPlayerError
    }
  });
};

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) handleTrackEnd();
  if (event.data === YT.PlayerState.PLAYING) {
    state.isPlaying = true; updatePlayPauseUI(); startProgressTracking();
  }
  if (event.data === YT.PlayerState.PAUSED) {
    state.isPlaying = false; updatePlayPauseUI(); stopProgressTracking();
  }
}

function onPlayerError(event) {
  setTimeout(nextTrack, 1500);
}

function safeLucide() {
  try { lucide.createIcons(); } catch (e) {}
}

/* === PLAYBACK CONTROLS === */
function loadTrack(index, autoplay = true) {
  if (!state.ytReady) return;
  if (index < 0 || index >= songs.length) return;

  const song = songs[index];
  const videoOverlay = document.getElementById('videoOverlay');
  if (videoOverlay && videoOverlay.classList.contains('open')) closeVideoOverlay();

  document.querySelectorAll('.track-card.playing, .featured-card.playing').forEach(el => el.classList.remove('playing'));

  state.currentTrackIndex = index;
  state.recentlyPlayed = [index, ...state.recentlyPlayed.filter(i => i !== index)].slice(0, 6);
  renderRecentGrid();

  document.getElementById('playerTitle').textContent = song.title;
  document.getElementById('playerArtist').textContent = song.artist;
  document.getElementById('playerCover').src = song.coverImageURL;

  document.getElementById('overlayTitle').textContent = song.title;
  document.getElementById('overlayArtist').textContent = song.artist;
  document.getElementById('overlayArt').src = song.coverImageURL;

  document.querySelectorAll(`[data-index="${index}"]`).forEach(el => el.classList.add('playing'));

  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('seekBar').value = 0;
  document.getElementById('currentTime').textContent = '0:00';
  document.getElementById('totalTime').textContent = '0:00';

  if (autoplay) {
    ytPlayer.loadVideoById(song.youtubeVideoID);
    state.isPlaying = true;
  } else {
    ytPlayer.cueVideoById(song.youtubeVideoID);
    state.isPlaying = false;
  }
  updatePlayPauseUI();
}

function playPause() {
  if (!state.ytReady) return;
  if (state.currentTrackIndex === -1) { loadTrack(0); return; }
  state.isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
}

function nextTrack() {
  if (state.isShuffle) {
    let next;
    do { next = Math.floor(Math.random() * songs.length); } while (next === state.currentTrackIndex && songs.length > 1);
    loadTrack(next);
  } else {
    loadTrack((state.currentTrackIndex + 1) % songs.length);
  }
}

function prevTrack() {
  if (state.ytReady && ytPlayer.getCurrentTime && ytPlayer.getCurrentTime() > 3) ytPlayer.seekTo(0, true);
  else loadTrack((state.currentTrackIndex - 1 + songs.length) % songs.length);
}

function handleTrackEnd() {
  if (state.isRepeat) { ytPlayer.seekTo(0, true); ytPlayer.playVideo(); } else nextTrack();
}

function setVolume(vol) {
  state.volume = Math.max(0, Math.min(100, vol));
  if (state.ytReady && ytPlayer.setVolume) ytPlayer.setVolume(state.volume);
  document.getElementById('volumeFill').style.width = state.volume + '%';
  document.getElementById('volumeSlider').value = state.volume;
  updateVolumeIcon();
}

function toggleMute() {
  if (!state.ytReady) return;
  state.isMuted = !state.isMuted;
  if (state.isMuted) {
    ytPlayer.mute(); document.getElementById('volumeFill').style.width = '0%';
  } else {
    ytPlayer.unMute(); document.getElementById('volumeFill').style.width = state.volume + '%';
  }
  updateVolumeIcon();
}

function updateVolumeIcon() {
  const icon = document.getElementById('volIcon');
  const vol = state.isMuted ? 0 : state.volume;
  icon.setAttribute('data-lucide', vol === 0 ? 'volume-x' : vol < 50 ? 'volume-1' : 'volume-2');
  safeLucide();
}

/* === PROGRESS === */
function startProgressTracking() { clearInterval(state.progressInterval); state.progressInterval = setInterval(updateProgress, 500); }
function stopProgressTracking() { clearInterval(state.progressInterval); }

function updateProgress() {
  if (!state.ytReady || !ytPlayer.getCurrentTime) return;
  try {
    const current = ytPlayer.getCurrentTime();
    const duration = ytPlayer.getDuration();
    if (!duration) return;
    const pct = (current / duration) * 100;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('seekBar').value = pct;
    document.getElementById('currentTime').textContent = formatTime(current);
    document.getElementById('totalTime').textContent = formatTime(duration);
  } catch(e) {}
}

function seekTo(pct) {
  if (!state.ytReady || !ytPlayer.getDuration) return;
  ytPlayer.seekTo((pct / 100) * ytPlayer.getDuration(), true);
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
}

function escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }

/* === UI HELPERS & RENDERING === */
function updatePlayPauseUI() {
  document.getElementById('playIcon').setAttribute('data-lucide', state.isPlaying ? 'pause' : 'play');
  const overlayIcon = document.getElementById('overlayPlayIcon');
  if (overlayIcon) overlayIcon.setAttribute('data-lucide', state.isPlaying ? 'pause' : 'play');
  safeLucide();
}

function createTrackCard(song, index, showAddBtn = false) {
  const card = document.createElement('div');
  card.className = 'track-card';
  card.dataset.index = index;
  let addButton = '';
  if (showAddBtn) {
    addButton = `<button class="card-play-btn youtube-add-btn" style="background:#E63946;" onclick="handleYouTubeTrackClick({title:'${escapeHtml(song.title)}',artist:'${escapeHtml(song.artist)}',coverImageURL:'${song.coverImageURL}',youtubeVideoID:'${song.youtubeVideoID}'})"><i data-lucide="plus"></i></button>`;
  } else {
    addButton = `<button class="card-play-btn"><i data-lucide="play"></i></button>`;
  }
  card.innerHTML = `
    <div class="card-cover">
      <img src="${song.coverImageURL}" alt="art" />
      ${addButton}
      <span class="card-now-playing">Playing</span>
    </div>
    <div class="card-body">
      <p class="card-title">${escapeHtml(song.title)}</p>
      <p class="card-artist">
        <span class="card-equalizer"><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span></span>
        ${escapeHtml(song.artist)}
      </p>
    </div>
  `;
  if (!showAddBtn) {
    card.onclick = () => state.currentTrackIndex === index ? playPause() : loadTrack(index);
  }
  return card;
}

function createFeaturedCard(song, index) {
  const card = document.createElement('div');
  card.className = 'featured-card';
  card.dataset.index = index;
  card.innerHTML = `<div class="featured-cover"><img src="${song.coverImageURL}" /></div><span class="featured-title">${escapeHtml(song.title)}</span><button class="featured-play-btn"><i data-lucide="play"></i></button>`;
  card.onclick = () => state.currentTrackIndex === index ? playPause() : loadTrack(index);
  return card;
}

function renderTrackGrid() {
  const grid = document.getElementById('trackGrid');
  if (!grid) return;
  grid.innerHTML = '';
  songs.forEach((song, i) => grid.appendChild(createTrackCard(song, i)));
  safeLucide();
}

function renderFeaturedGrid() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = '';
  songs.slice(0, 6).forEach((song, i) => grid.appendChild(createFeaturedCard(song, i)));
  safeLucide();
}

function renderRecentGrid() {
  const grid = document.getElementById('recentGrid');
  if (!grid) return;
  grid.innerHTML = '';
  if (state.recentlyPlayed.length === 0) grid.innerHTML = '<p class="empty-state">Nothing played yet...</p>';
  else state.recentlyPlayed.forEach(i => grid.appendChild(createTrackCard(songs[i], i)));
  safeLucide();
}

function renderLibraryList() {
  const list = document.getElementById('libraryList');
  if (!list) return;
  list.innerHTML = '';
  songs.forEach((song, i) => {
    const item = document.createElement('div');
    item.className = 'library-item';
    item.innerHTML = `<div class="library-item-cover"><img src="${song.coverImageURL}" /></div><div class="library-item-meta"><p class="library-item-title">${escapeHtml(song.title)}</p><p class="library-item-sub">Song &middot; ${escapeHtml(song.artist)}</p></div>`;
    item.onclick = () => loadTrack(i);
    list.appendChild(item);
  });
}

function renderArtistGrid() {
  const grid = document.getElementById('artistGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const artistMap = {};
  songs.forEach((s, i) => {
    if (!artistMap[s.artist]) artistMap[s.artist] = { name: s.artist, cover: s.coverImageURL, indices: [] };
    artistMap[s.artist].indices.push(i);
  });
  Object.values(artistMap).forEach(artist => {
    const card = document.createElement('div');
    card.className = 'artist-card';
    card.innerHTML = `<div class="artist-card-avatar"><img src="${artist.cover}"><button class="artist-card-play"><i data-lucide="play"></i></button></div><p class="artist-card-name">${escapeHtml(artist.name)}</p><p class="artist-card-role">Artist</p>`;
    card.onclick = () => showArtist(artist);
    grid.appendChild(card);
  });
  safeLucide();
}

function showArtist(artist) {
  document.getElementById('artistHeroAvatar').innerHTML = `<img src="${artist.cover}" />`;
  document.getElementById('artistHeroName').textContent = artist.name;
  document.getElementById('artistHeroStats').textContent = `${artist.indices.length} tracks`;
  const listEl = document.getElementById('artistTrackList');
  listEl.innerHTML = '';
  artist.indices.forEach((songIdx, pos) => {
    const song = songs[songIdx];
    const row = document.createElement('div');
    row.className = 'artist-track-row';
    row.dataset.index = songIdx;
    row.innerHTML = `<span class="artist-track-num">${pos + 1}</span><div class="artist-track-cover"><img src="${song.coverImageURL}" /></div><div class="artist-track-meta"><span class="artist-track-title">${escapeHtml(song.title)}</span><span class="artist-track-subtitle">${escapeHtml(song.artist)}</span></div>`;
    row.onclick = () => loadTrack(songIdx);
    listEl.appendChild(row);
  });
  state.currentArtistIndices = artist.indices;
  showView('artist');
  safeLucide();
}

const CATEGORIES = [
  { label: 'Pop', bg: '#8D67AB', emoji: '🎤' },
  { label: 'Hip-Hop', bg: '#BA5D07', emoji: '🎧' },
  { label: 'Electronic', bg: '#0D73EC', emoji: '🎛️' },
  { label: 'R&B', bg: '#C62B2B', emoji: '🎵' },
  { label: 'Rock', bg: '#1E3264', emoji: '🎸' },
  { label: 'Latin', bg: '#DC148C', emoji: '💃' }
];

function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.style.background = cat.bg;
    card.innerHTML = `${escapeHtml(cat.label)}<span class="cat-emoji">${cat.emoji}</span>`;
    grid.appendChild(card);
  });
}

function renderSearchResults(query) {
  const grid = document.getElementById('searchGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const q = query.trim().toLowerCase();
  if (!q) { grid.innerHTML = '<p class="empty-state">Start typing...</p>'; return; }
  const results = songs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));

  // If local results found, display them
  if (results.length > 0) {
    results.forEach(song => grid.appendChild(createTrackCard(song, songs.indexOf(song))));
    safeLucide();
    return;
  }

  // No local results, fetch from YouTube
  if (YOUTUBE_API_KEY) {
    grid.innerHTML = '<p class="empty-state">Searching YouTube...</p>';
    searchYouTube(query).then(ytResults => {
      grid.innerHTML = '';
      if (ytResults.length === 0) {
        grid.innerHTML = '<p class="empty-state">No results found.</p>';
        return;
      }
      ytResults.forEach((song, idx) => {
        const card = createTrackCard(song, idx, true);
        card.style.opacity = '0.9';
        card.style.borderLeft = '3px solid var(--accent)';
        grid.appendChild(card);
      });
      safeLucide();
    });
  } else {
    grid.innerHTML = '<p class="empty-state">No results found. YouTube search not configured.</p>';
  }
}

function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-btn').forEach(n => n.classList.remove('active'));

  const viewEl = document.getElementById(`view-${viewName}`);
  if (viewEl) viewEl.classList.add('active');
  const navBtn = document.querySelector(`.nav-item[data-view="${viewName}"]`);
  if (navBtn) navBtn.classList.add('active');
  const mobileNavBtn = document.querySelector(`.mobile-nav-btn[data-view="${viewName}"]`);
  if (mobileNavBtn) mobileNavBtn.classList.add('active');

  const searchWrap = document.getElementById('topbarSearchWrap');
  if (searchWrap) searchWrap.style.display = viewName === 'search' ? 'flex' : 'none';

  // When showing home view, render appropriate content
  if (viewName === 'home') {
    if (state.currentTrackIndex === -1) {
      showEmptyState();
    } else {
      generateRecommendations(state.currentTrackIndex);
    }
  }

  if (viewHistory[viewHistory.length - 1] !== viewName) viewHistory.push(viewName);
  document.getElementById('mainContent').scrollTop = 0;
}

/* === EMPTY STATE === */
function showEmptyState() {
  const homeView = document.getElementById('view-home');
  if (!homeView) return;
  homeView.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:24px;">
      <div style="font-size:4rem;">🎵</div>
      <h1 style="font-size:2.4rem;font-weight:700;margin:0;">Search for music to get started</h1>
      <p style="font-size:1.4rem;color:var(--text-secondary);margin:0;">Try searching for an artist or song</p>
    </div>
  `;
}

/* === RECOMMENDATIONS === */
async function generateRecommendations(trackIndex) {
  const track = songs[trackIndex];
  if (!track) return;

  const artist = track.artist;
  const relatedResults = await searchYouTube(`${artist} similar`);
  const discographyResults = await searchYouTube(`${artist} all songs`);

  displayRecommendations(relatedResults.slice(0, 5), discographyResults.slice(0, 5), artist);
}

function displayRecommendations(relatedTracks, discographyTracks, artist) {
  const homeView = document.getElementById('view-home');
  if (!homeView) return;
  homeView.innerHTML = '';

  if (relatedTracks && relatedTracks.length > 0) {
    const section1 = document.createElement('section');
    section1.className = 'content-section';
    section1.innerHTML = '<h2 class="section-title">Similar to this track</h2>';
    const grid1 = document.createElement('div');
    grid1.className = 'track-grid';
    relatedTracks.forEach((track, idx) => grid1.appendChild(createTrackCard(track, -1000 - idx, true)));
    section1.appendChild(grid1);
    homeView.appendChild(section1);
  }

  if (discographyTracks && discographyTracks.length > 0) {
    const section2 = document.createElement('section');
    section2.className = 'content-section';
    section2.innerHTML = `<h2 class="section-title">More from ${escapeHtml(artist)}</h2>`;
    const grid2 = document.createElement('div');
    grid2.className = 'track-grid';
    discographyTracks.forEach((track, idx) => grid2.appendChild(createTrackCard(track, -2000 - idx, true)));
    section2.appendChild(grid2);
    homeView.appendChild(section2);
  }
}

/* === VIDEO OVERLAY LOGIC === */
let isVideoMode = false;

function toggleVideoOverlay() {
  const overlay = document.getElementById('videoOverlay');
  const isOpen = overlay.classList.contains('open');
  if (isOpen && !overlay.classList.contains('mini')) return closeVideoOverlay();
  if (isOpen && overlay.classList.contains('mini')) return expandVideo();
  if (state.currentTrackIndex === -1) return;
  openVideoFull();
}

function openVideoFull() {
  const song = songs[state.currentTrackIndex];
  const overlay = document.getElementById('videoOverlay');
  const playerWrapper = document.getElementById('yt-player-wrapper');

  document.getElementById('videoTitle').textContent = song.title;
  document.getElementById('videoSubtitle').textContent = song.artist + ' — Music Video';
  document.getElementById('videoMiniTitle').textContent = song.title;
  document.getElementById('videoMiniArtist').textContent = song.artist;
  document.getElementById('videoMiniCover').src = song.coverImageURL;

  playerWrapper.style.display = 'block';
  overlay.classList.remove('mini');
  overlay.classList.add('open');
  document.getElementById('btnVideo').classList.add('active');
  document.getElementById('videoMinimize').style.display = '';
  document.getElementById('videoExpand').style.display = 'none';
  isVideoMode = true;
  safeLucide();
}

function minimizeVideo() {
  const overlay = document.getElementById('videoOverlay');
  if (!overlay.classList.contains('open')) return;
  overlay.classList.add('mini');
  document.getElementById('videoMinimize').style.display = 'none';
  document.getElementById('videoExpand').style.display = '';
}

function expandVideo() {
  const overlay = document.getElementById('videoOverlay');
  if (!overlay.classList.contains('open')) return;
  overlay.classList.remove('mini');
  overlay.classList.remove('theater');
  document.getElementById('videoMinimize').style.display = '';
  document.getElementById('videoExpand').style.display = 'none';
}

function toggleTheaterMode() {
  const overlay = document.getElementById('videoOverlay');
  if (!overlay.classList.contains('open')) return;
  overlay.classList.toggle('theater');
  overlay.classList.remove('mini');
  document.getElementById('videoMinimize').style.display = '';
  document.getElementById('videoExpand').style.display = 'none';
}

function closeVideoOverlay() {
  const overlay = document.getElementById('videoOverlay');
  const playerWrapper = document.getElementById('yt-player-wrapper');

  playerWrapper.style.display = 'none';
  overlay.classList.remove('open', 'mini', 'theater');
  document.getElementById('btnVideo').classList.remove('active');

  if (state.currentTrackIndex !== -1 && state.isPlaying) setTimeout(() => ytPlayer.playVideo(), 100);
  isVideoMode = false;
}

/* === EVENTS & INITIALIZATION === */
document.addEventListener('DOMContentLoaded', () => {
  showEmptyState();
  renderLibraryList();
  renderCategories();
  safeLucide();

  document.querySelectorAll('.nav-item, .mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showView(btn.dataset.view);
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  document.getElementById('btnPlayPause').onclick = playPause;
  document.getElementById('btnNext').onclick = nextTrack;
  document.getElementById('btnPrev').onclick = prevTrack;
  document.getElementById('btnShuffle').onclick = function() { state.isShuffle = !state.isShuffle; this.classList.toggle('active'); };
  document.getElementById('btnRepeat').onclick = function() { state.isRepeat = !state.isRepeat; this.classList.toggle('active'); };

  document.getElementById('seekBar').oninput = (e) => seekTo(parseFloat(e.target.value));
  document.getElementById('volumeSlider').oninput = (e) => setVolume(parseInt(e.target.value, 10));
  document.getElementById('btnMute').onclick = toggleMute;

  document.getElementById('playerCover').closest('.player-cover-wrap').onclick = () => document.getElementById('nowPlayingOverlay').classList.add('open');
  document.getElementById('overlayClose').onclick = () => document.getElementById('nowPlayingOverlay').classList.remove('open');
  document.getElementById('btnFullscreen').onclick = () => document.getElementById('nowPlayingOverlay').classList.toggle('open');

  document.getElementById('overlayPlayPause').onclick = playPause;
  document.getElementById('overlayNext').onclick = nextTrack;
  document.getElementById('overlayPrev').onclick = prevTrack;
  document.getElementById('overlaySeekBar').oninput = (e) => seekTo(parseFloat(e.target.value));

  document.getElementById('btnVideo').onclick = toggleVideoOverlay;
  document.getElementById('videoClose').onclick = closeVideoOverlay;
  document.getElementById('videoTheater').onclick = toggleTheaterMode;
  document.getElementById('videoMinimize').onclick = minimizeVideo;
  document.getElementById('videoExpand').onclick = expandVideo;
  document.getElementById('videoMiniExpand').onclick = expandVideo;
  document.getElementById('videoMiniClose').onclick = closeVideoOverlay;

  document.getElementById('searchInput').oninput = (e) => {
    showView('search');
    renderSearchResults(e.target.value);
  };

  document.getElementById('sidebarToggle').onclick = () => document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('artistBackBtn').onclick = () => {
    viewHistory.pop();
    showView(viewHistory[viewHistory.length - 1] || 'home');
  };
  document.getElementById('artistPlayAllBtn').onclick = () => {
    if(state.currentArtistIndices.length) loadTrack(state.currentArtistIndices[0]);
  };
  document.getElementById('navBack').onclick = () => {
    if(viewHistory.length>1) { viewHistory.pop(); showView(viewHistory[viewHistory.length-1]); }
  };
});
