import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's see if FAQ has data-i18n
faq_idx = html.find('Часто задаваемые вопросы')
if faq_idx != -1:
    print(html[faq_idx-50:faq_idx+200])

about_idx = html.find('Всё, что нужно знать об арбитражном разбирательстве')
if about_idx != -1:
    print(html[about_idx-50:about_idx+200])
