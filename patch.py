import sys

with open(r'd:\Documents\GitHub\SpopyFly\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = """    title:          'Bad Guy',
    artist:         'Billie Eilish',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273c6f7af36bc1f8b953d4dc274',
    youtubeVideoID: 'DyDfgMOUjCI'
  }
];"""

replacement = """    title:          'Bad Guy',
    artist:         'Billie Eilish',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273c6f7af36bc1f8b953d4dc274',
    youtubeVideoID: 'DyDfgMOUjCI'
  },
  // --- Taylor Swift - 1989 ---
  {
    title:          'Blank Space',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: 'e-ORhEE9VVg'
  },
  {
    title:          'Style',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: '-CmadmM5cOk'
  },
  {
    title:          'Shake It Off',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: 'nfWlot6h_JM'
  },
  {
    title:          'Bad Blood',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: 'QqwH2i_845c'
  },
  {
    title:          'Wildest Dreams',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: 'IdneKLooZaU'
  },
  // --- Fleetwood Mac - Rumours ---
  {
    title:          'Dreams',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: 'Y3ywicfc0Lc'
  },
  {
    title:          'Go Your Own Way',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: '6ul-cZyuYq4'
  },
  {
    title:          'Don\\'t Stop',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: 'SyTvR1vWfB8'
  },
  {
    title:          'The Chain',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: 'PCXpE2856yY'
  },
  {
    title:          'Never Going Back Again',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: 'sKkWg2kRAl4'
  },
  // --- Kendrick Lamar - DAMN. ---
  {
    title:          'BLOOD.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'V-HkLDEY_Ew'
  },
  {
    title:          'DNA.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'NLZRYQMLDW4'
  },
  {
    title:          'YAH.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'vCNOeS3zXEQ'
  },
  {
    title:          'ELEMENT.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'glaG64Ao7sM'
  },
  {
    title:          'LOYALTY.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'Dlg-P005U-Y'
  },
  // --- Daft Punk - Discovery ---
  {
    title:          'One More Time',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83',
    youtubeVideoID: 'FGBhQbmPwH8'
  },
  {
    title:          'Aerodynamic',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83',
    youtubeVideoID: 'L93-7vRfxNs'
  },
  {
    title:          'Digital Love',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83',
    youtubeVideoID: 'F_O1E42XlEI'
  },
  {
    title:          'Harder, Better, Faster, Stronger',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83',
    youtubeVideoID: 'gAjR4_CbPpQ'
  },
  {
    title:          'Something About Us',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83',
    youtubeVideoID: 'em0MknB6wVw'
  },
  // --- Adele - 25 ---
  {
    title:          'Hello',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'YQHsXMglC9A'
  },
  {
    title:          'Send My Love (To Your New Lover)',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'fk4BbF7B29w'
  },
  {
    title:          'I Miss You',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'dHn1_u9S3T0'
  },
  {
    title:          'When We Were Young',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'DDWKuo3gXMQ'
  },
  {
    title:          'Remedy',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'rH4lP2lRlc0'
  }
];"""

if target in content:
    try:
        with open(r'd:\Documents\GitHub\SpopyFly\script.js', 'w', encoding='utf-8') as f:
            f.write(content.replace(target, replacement))
        print("Success")
    except Exception as e:
        print(f"Error: {e}")
else:
    print("Target not found")
