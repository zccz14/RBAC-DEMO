# RBAC Demo

Implement RBAC0 within 100 lines.

[live demo](https://zccz14.com/RBAC-DEMO)

[live User Assignment](https://zccz14.com/RBAC-DEMO/UA.csv)

[live Permission Assignment](https://zccz14.com/RBAC-DEMO/PA.csv)

## Local Usage

Download or clone this repository and run it in a static web server.

**Notice: DO NOT run it with file protocol!!!**

### Config RBAC

Modify `UA.csv` and `PA.csv`. Refresh to see changes.

### Config Component's required permission

Modify `index.html`, the RBAC components must have class named `rbac` and attributes named `data-pid` with value of **Permission ID**.

There is a sample in `index.html`.