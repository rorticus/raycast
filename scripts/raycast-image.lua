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

local columnImageData = {}
local columnOffsets = {}
local columnHeights = {}

-- for each column in this image, we need to know the offset of the first transparent pixel
for x = 0, width - 1 do
	local topOffset = -1
	local bottomOffset = -1
	
	-- first check the top offset
	for y = 0, height - 1 do
		local c = img:getPixel(x, y)
		if  c ~= 0 then
			topOffset = y
			break
		end
	end

	-- then check the bottom offset
	for y = height - 1, 0, -1 do
		local c = img:getPixel(x, y)
		if c ~= 0 then
			bottomOffset = height - y
			break
		end
	end

	if topOffset == -1 then
		columnOffsets[x + 1] = 0
		columnHeights[x + 1] = 0
		columnImageData[x + 1] = nil
	else
		-- construct the image data
		columnOffsets[x + 1] = topOffset
		columnHeights[x + 1] = height - topOffset - bottomOffset + 1
		local str = ""
		for y = topOffset, height - bottomOffset do
			c = img:getPixel(x, y)
			str = str .. string.format("%x", c)
		end

		local rounded = math.fmod(string.len(str), 4)

		if rounded > 0 then
			for i = 0, 3 - rounded do
				str = str .. "0"
			end
		end
		
		columnImageData[x + 1] = str
	end

end

local spriteName = spr.filename:match("^.+/(.+)%..+$")

local text = ""

text = "const " .. spriteName .. " = {\n"
text = text .. "    offsets: [" .. table.concat(columnOffsets, ", ") .. "],\n"
text = text .. "    heights: [" .. table.concat(columnHeights, ", ") .. "],\n"

text = text .. "    data: [\n"
for x = 0, width - 1 do
	if columnImageData[x + 1] == nil then
		text = text .. "        null,\n"
	else
		text = text .. "        image.ofBuffer(hex`e401" .. string.format("%02x", columnHeights[x + 1]) .. "00" .. columnImageData[x + 1] .. "`),\n"
	end
end
text = text .. "    ]"
text = text .. "};"
--//local text = "const " .. spriteName .. " = img`\n" .. table.concat(imageData, "\n") .. "`;"

print(text)
