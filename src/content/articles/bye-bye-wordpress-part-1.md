---
title: Bye Bye WordPress (Part 1)
description: WordPress served well for a decade, but the complexity tax finally outweighed the convenience. I switched to Jekyll and never looked back.
publishedAt: 2026-07-22
author: Vishal Shanbhag
tags:
  - WordPress
  - Jekyll
  - web-development
  - performance
  - static-site
draft: false
featured: false
locale: en
image: ./bye-bye-wordpress-part-1.webp
imageAlt: "PageSpeed Insights score of 100 for the Jekyll starter template"
---

# Bye Bye WordPress (Part 1)

A condensed summary of an article originally published on [Level Up Coding](https://levelup.gitconnected.com/bye-bye-wordpress-61bc464702fb) in February 2025.

---

WordPress has been the go-to website builder and CMS product for over a decade. It is popular but has its limitations, especially in performance. This article introduces the Jekyll static site generator as a high-performance alternative.

## So What is Wrong with WordPress?

WordPress continues to be the most popular CMS even today and is pretty much the de facto software for many website developers. However, it comes with its fair share of challenges.

**Version Management and Merge Conflict.** If one wants to change the theme or design of the website without downtime, it is quite challenging. Either one has to make changes on a live website or work on a staging website, and then update the main one after everything is ready.

**Security Updates.** WordPress is open source and the community is quick to fix security issues. One can set up automatic updates to ensure that the site is always secure. However, now and then, a security upgrade breaks something in the site because of incompatible plugins or themes.

**Clunky Plugins.** Default WordPress has a lot of functionality, but for production use one typically adds a few more plugins. The top plugins are reasonably stable, but some of the lesser-used plugins can be clunky and cause things to break with updates.

**Page Speed.** These days users do not have patience and when it comes to loading web pages the rule of thumb is that if a user can blink more than twice before the website loads then that is slow. With WordPress, getting to this speed is possible but needs some serious tuning and caching which usually involves adding some specific plugins.

## Introducing Static Site Generators

A solution to some of these problems is to use static websites built in HTML. If we think of a website as a car and a content creator as a car driver, then we can think of a programmer as a car mechanic. One does not require a car mechanic to be on board to take the car for a spin.

This is where static site generators shine. A static site generator takes plain text documents and converts them into HTML at the time of deployment without needing the intervention of programmers. This also means that at runtime there is no need to hit a database and webservers can simply send static HTML back to the browser without any extra processing.

Serving static pages allows for a lot of optimisation on the server side for speed and has been known to offer sub-second load times for pages. This is a huge advantage already, and the website content now becomes a part of a Git repository, adding the advantage of version management.

## Testing Site Generators

With a background in WordPress and the advantages of static site generators considered, it was now time for me to check this for real. Jekyll, with about 1.8 million users and more than 1,000 contributors, is the most popular static site generator. For my test, I chose Jekyll.

I challenged myself to do everything without resorting to my programming skills. Not knowing some of the underlying technologies, like Front Matter, Liquid Templates, and Markdown formatting, was a good thing since it allowed me to work like a non-programmer. I could ask questions to ChatGPT or run a Google search and follow its instructions.

I did this for a few weekends, much to the annoyance of my family, but I was pleased with the tech side of the results. I was able to generate a website with all the previously mentioned features and more. Better still, I now have a quick-start repository in [GitHub](https://github.com/new?template_name=github_jekyll_pages_demo&template_owner=vshanbha) which is ready to go with all the features.

## The Proof is in the Pudding

I find that Google's PageSpeed Insights is a great tool to get some measurements on any website from an end user's perspective. After I was happy that the website was ready, I ran PageSpeed Insights on it. I was pleasantly surprised to get a Performance score of 100 on the Desktop view.

## Reality Check

As I said, the performance scores were incredible, especially considering that this is a fun weekend project and I did not spend any time optimising for speed. Real projects are likely going to be a little more complex and might involve more content with more images, and I fully expect scores to drop a bit. However, when you start at a high score, I expect that a drop would not be so bad.

For any professional static website, three key features are not readily available: the ability to comment, a contact us page, and signing up for a newsletter. If one considers e-commerce, there are many more features that one might expect. All of these features require a server-side and dynamic content.

For some common use cases, one can potentially work without specialised programming. For example, one can set up a contact form on SaaS software such as Google Forms and include it on the contact us page. Static site generators shine here, allowing ease of pulling dynamic content from elsewhere with a little bit of HTML code.

## Conclusion

I started the article with "Bye Bye WordPress". I will accept that it is not an easy decision, and the break-up with WordPress is going to be hard. WordPress is very powerful with its large selection of plugins and features. However, I believe I have demonstrated here that when the maintenance complexity of WordPress is a challenge and site speed is important, Jekyll does provide a suitable alternative.

For bloggers and small business owners who are somewhat technically inclined, I think Jekyll is certainly a strong contender.

---

*The full article covers the hosting provider comparison, the step-by-step quick-start guide, the specific migration gotchas, and the reasoning behind still recommending WordPress to non-technical clients despite having already left it myself.*

[*Read the full version on Level Up Coding*](https://levelup.gitconnected.com/bye-bye-wordpress-61bc464702fb)
