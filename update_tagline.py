import os

html_file = r'y:\Project\Alphabet to Authors\index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Add tagline
old_desc = '''          <p class="hero-desc">
            Welcome to Alphabets to Authors! Whether you are a parent looking to build your child's confidence or a professional aiming to sharp-tune your corporate presence, we have a space for you.'''

new_desc = '''          <p class="hero-desc" style="font-weight: 600; color: var(--color-primary); font-size: 1.25rem; margin-bottom: -0.5rem;">
            Where young minds become creative writers, and professionals become impactful leaders.
          </p>
          <p class="hero-desc">
            Welcome to Alphabets to Authors! Whether you are a parent looking to build your child's confidence or a professional aiming to sharp-tune your corporate presence, we have a space for you.'''

html = html.replace(old_desc, new_desc)

# Remove age limit
old_age = '<input type="number" id="child-age" min="4" max="17" required placeholder="e.g. 8">'
new_age = '<input type="number" id="child-age" required placeholder="e.g. 8 or 25">'

html = html.replace(old_age, new_age)

old_age_label = '<label for="child-age">Child\'s Age *</label>'
new_age_label = '<label for="child-age">Age of Participant *</label>'

html = html.replace(old_age_label, new_age_label)

# Also update child name label to be more generic since adults might register themselves
old_child_label = '<label for="child-name-input">Child\'s Name *</label>'
new_child_label = '<label for="child-name-input">Participant\'s Name *</label>'

html = html.replace(old_child_label, new_child_label)

old_parent_label = '<label for="parent-name">Parent\'s Name *</label>'
new_parent_label = '<label for="parent-name">Parent / Guardian Name (If applicable)</label>'

html = html.replace(old_parent_label, new_parent_label)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
