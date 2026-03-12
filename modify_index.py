import sys

def modify_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Title tag
    content = content.replace('<title>Центрально-Евразийский арбитражный суд</title>', '<title>Центрально-Азиатский экономический арбитраж</title>')

    # 2. Header title
    old_h1 = '''                    <h1 class="font-bold text-sm uppercase tracking-wider leading-none" data-i18n="brand_name">
                        Центрально-Евразийский</h1>
                    <p class="text-xs text-slate-500 uppercase tracking-widest" data-i18n="brand_sub" data-i18n="th_arb"
                        data-i18n="th_arb">Арбитраж</p>'''
    new_h1 = '''                    <h1 class="font-bold text-sm uppercase tracking-wider leading-none" data-i18n="brand_name">
                        Центрально-Азиатский</h1>
                    <p class="text-xs text-slate-500 uppercase tracking-widest" data-i18n="brand_sub">Экономический арбитраж</p>'''
    content = content.replace(old_h1, new_h1)

    # 3. Hero title
    old_hero = '''                    Если спор неизбежен, <br><span class="hero-highlight">выигрывайте
                        его у нас!</span>'''
    new_hero = '''                    Центрально-Азиатский <br><span class="hero-highlight">экономический арбитраж</span>'''
    content = content.replace(old_hero, new_hero)

    # 4. Remove section from Stats Bar to About Arbitration body
    start_marker = '        <!-- Stats Bar -->'
    end_marker = '        <section class="py-16 bg-slate-50">\n            <div class="container mx-auto px-4 max-w-5xl space-y-10">'
    
    if start_marker in content and end_marker in content:
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker) + len(end_marker)
        
        replacement = '''        <!-- About Arbitration -->
        <section id="about-section" class="py-20 bg-slate-50 border-t border-slate-100">
            <div class="container mx-auto px-4 max-w-5xl space-y-10">
                <div class="text-center mb-16 reveal">
                    <h3 class="serif text-3xl md:text-4xl text-navy mb-4" data-i18n="about_title">Об арбитраже</h3>
                    <p class="text-slate-500 text-lg" data-i18n="about_desc">Всё, что нужно знать об арбитражном разбирательстве</p>
                </div>'''
        
        content = content[:start_idx] + replacement + content[end_idx:]
    else:
        print("Markers not found in HTML")
    
    # 5. Fix remaining references
    content = content.replace('Центрально-Евразийский арбитражный суд', 'Центрально-Азиатский экономический арбитраж')
    content = content.replace('Центрально-Евразийский', 'Центрально-Азиатский')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

def modify_js():
    with open('js/main.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # ru
    content = content.replace("'brand_name': 'Центрально-Евразийский', 'brand_sub': 'Арбитражный суд'", "'brand_name': 'Центрально-Азиатский', 'brand_sub': 'экономический арбитраж'")
    content = content.replace("'hero_title': 'Справедливое разрешение споров <br><span class=\"text-amber-500\">для вашего бизнеса</span>'", "'hero_title': 'Центрально-Азиатский <br><span class=\"text-amber-500\">экономический арбитраж</span>'")

    # kz
    content = content.replace("'brand_name': 'Орталық Еуразиялық', 'brand_sub': 'Төрелік соты'", "'brand_name': 'Орталық Азия', 'brand_sub': 'экономикалық төрелігі'")
    content = content.replace("'hero_title': 'Сіздің бизнесіңіз үшін <br><span class=\"text-amber-500\">дауларды әділ шешу</span>'", "'hero_title': 'Орталық Азия <br><span class=\"text-amber-500\">экономикалық төрелігі</span>'")
    
    # en
    content = content.replace("'brand_name': 'Central Eurasian', 'brand_sub': 'Arbitration Court'", "'brand_name': 'Central Asian', 'brand_sub': 'Economic Arbitration'")
    content = content.replace("'hero_title': 'Fair dispute resolution <br><span class=\"text-amber-500\">for your business</span>'", "'hero_title': 'Central Asian <br><span class=\"text-amber-500\">Economic Arbitration</span>'")

    # copyright
    content = content.replace('Центрально-Евразийский арбитражный суд', 'Центрально-Азиатский экономический арбитраж')
    content = content.replace('Орталық Еуразиялық төрелік соты', 'Орталық Азия экономикалық төрелігі')
    content = content.replace('Central Eurasian Arbitration Court', 'Central Asian Economic Arbitration')

    with open('js/main.js', 'w', encoding='utf-8') as f:
        f.write(content)

modify_html()
modify_js()
