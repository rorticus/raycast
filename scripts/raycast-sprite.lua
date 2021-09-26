local spr = app.activeSprite
if not spr then
    return app.alert "There is no active sprite"
end

if spr.colorMode ~= ColorMode.INDEXED then
    return app.alert("Sprite must be indexed color")
end

local width = spr.width
local height = spr.height

local img = Image(spr.spec)
img:clear()
img:drawSprite(spr, app.activeFrame)

local imageData = {}

for y = 0, height - 1 do
    local row = {}
    for x = 0, width - 1 do
        local c = img:getPixel(x, y)

        if c == 0 then
            row[x + 1] = "."
        else
            row[x + 1] = string.format("%x", c)
        end
    end

    imageData[y + 1] = table.concat(row, " ")
end

local spriteName = spr.filename:match("^.+/(.+)%..+$")

local text = "const " .. spriteName .. " = img`\n" .. table.concat(imageData, "\n") .. "`;"

print(text)
