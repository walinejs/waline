---
title: Security
icon: safe
order: -10
---

The security of the Waline commenting system is our top priority. We'll cover Waline's security here.

<!-- more -->

## Comment Security

### Anti-XSS Attack

Waline uses [DOMPurify](https://github.com/cure53/DOMPurify) to filter each comment input on the server side to prevent potential XSS attacks. This means you won't be able to use `<iframe>` or any form of scripting.

### Prevent link tracking

All links will be automatically set to `rel="noreferrer noopener"` and open in a new window with `target="_blank"`.

### Prevent Malicious Content Implantation

- In order to prevent users from creating submittable forms in the comment area to trick other visitors into submitting information, you cannot use `<form>` and `<input>`

- In order to prevent users from using styles to modify website pages or modify their own comment styles to plant spam ads, the `<style>` tag and the `style` attribute on the element are not available.

- To prevent users from abusing media autoplay functionality, you cannot use the `autoplay` attribute.

### Prevent Forgery

Waline supports an account system, so you can force users to register and log in with an account. This way visitors won't be able to fake other people's comments.

To enable this feature, you need to set mandatory login on both client and server, see [`login`](../../reference/client/props.md#login) and [`LOGIN`](../../reference/server/env.md#basic) for details.

## Site Security

### Frequency Limit

To prevent users from commenting, Waline will restrict commenting IP. By default, the same IP can only send one comment within a minute. You can change this limit in [Server Reference → Environment Variables](../../reference/server/env.md#safety).

### Prevent flooding

Waline will detect existing comments when entering comments, and if it detects a comment with too high similarity, it will reject the corresponding comment. Those who can prevent flooding to a certain extent.

### Comment Review

When your site is under malicious attack, during sensitive periods or when you are busy, you can enable the comment review feature. For details, see [Server Reference→Environment Variables](../../reference/server/env.md#safety) .

When comment review is enabled, all new comments will be hidden by default. You can view and review comments in the Waline management terminal or the comment box on the corresponding page. Only the comments you approved can be displayed.

## Data Security

Since Waline have server side, no body can tamper with comment data or pageviews.

Meanwhile, you can set `DISABLE_USERAGENT` and `DISABLE_REGION` variables on the server side to prevent others from viewing the UA and geographic location of user comments.
